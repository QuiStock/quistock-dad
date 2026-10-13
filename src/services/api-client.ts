import axios, {
  AxiosHeaders,
  isAxiosError,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from 'axios'

import { postRefresh } from '@/services/api-auth'
import type { IApiErrorResponse } from '@/types'

export const SESSION_EXPIRED_EVENT = 'authSessionExpired'

const CSRF_COOKIE_NAME = 'XSRF-TOKEN'
const CSRF_HEADER_NAME = 'X-XSRF-TOKEN'
const MUTATING_METHODS = ['post', 'put', 'patch', 'delete']

export const coreApiUrl: string =
  (import.meta.env.CORE_API_URL as string | undefined) ??
  'http://localhost:8080'

export const coreApi = axios.create({
  baseURL: coreApiUrl,
  withCredentials: true,
})

type TRetriableConfig = InternalAxiosRequestConfig & {
  _retriedAuth?: boolean
  _retriedCsrf?: boolean
}

let csrfToken: string | null = null
let csrfRequest: Promise<string | null> | null = null

const readCsrfCookie = (): string | null => {
  const match = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${CSRF_COOKIE_NAME}=`))

  return match ? decodeURIComponent(match.split('=')[1]) : null
}

const fetchCsrfToken = async (): Promise<string | null> => {
  try {
    const { data } = await coreApi.get<{ token?: string } | undefined>(
      '/csrf',
    )
    return data?.token ?? readCsrfCookie()
  } catch {
    return readCsrfCookie()
  }
}

const getCsrfToken = async (forceRefresh = false): Promise<string | null> => {
  if (csrfToken && !forceRefresh) return csrfToken

  csrfRequest ??= fetchCsrfToken().finally(() => {
    csrfRequest = null
  })
  csrfToken = await csrfRequest

  return csrfToken
}

const isMutation = (config: InternalAxiosRequestConfig) =>
  MUTATING_METHODS.includes((config.method ?? 'get').toLowerCase())

coreApi.interceptors.request.use(async (config) => {
  if (!isMutation(config)) return config

  const token = await getCsrfToken()
  if (token) {
    config.headers = AxiosHeaders.from(config.headers)
    config.headers.set(CSRF_HEADER_NAME, token)
  }

  return config
})

let refreshRequest: Promise<boolean> | null = null

const refreshSession = (): Promise<boolean> => {
  refreshRequest ??= postRefresh()
    .then(() => true)
    .catch(() => false)
    .finally(() => {
      refreshRequest = null
    })

  return refreshRequest
}

coreApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<IApiErrorResponse>) => {
    const config = error.config as TRetriableConfig | undefined
    const status = error.response?.status

    if (!config) throw error

    if (status === 401 && !config._retriedAuth) {
      config._retriedAuth = true

      const refreshed = await refreshSession()
      if (refreshed) return coreApi(config)

      window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT))
    }

    if (status === 403 && isMutation(config) && !config._retriedCsrf) {
      config._retriedCsrf = true
      await getCsrfToken(true)
      return coreApi(config)
    }

    throw error
  },
)

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Dados inválidos. Verifique os campos e tente novamente.',
  401: 'Sua sessão expirou. Faça login novamente.',
  403: 'Você não tem permissão para realizar esta ação.',
  404: 'Registro não encontrado.',
  409: 'Já existe um registro com estes dados.',
  503: 'Serviço indisponível no momento. Tente novamente mais tarde.',
}

const extractErrorMessage = (
  response: { status: number; data: unknown },
  fallbackMessage: string,
): string => {
  const data = response.data
  if (data && typeof data === 'object' && 'message' in data) {
    const customMessage = (data as IApiErrorResponse).message
    if (customMessage) return customMessage
  }

  return STATUS_MESSAGES[response.status] ?? fallbackMessage
}

export const normalizeApiError = (
  error: unknown,
  fallbackMessage: string,
): Error => {
  if (!isAxiosError<IApiErrorResponse>(error)) {
    return error instanceof Error ? error : new Error(fallbackMessage)
  }

  if (error.response) {
    const resolvedMessage = extractErrorMessage(error.response, fallbackMessage)
    const existingData = typeof error.response.data === 'object' ? error.response.data : {}

    error.response.data = {
      ...existingData,
      message: resolvedMessage,
    }
  }

  return error
}
