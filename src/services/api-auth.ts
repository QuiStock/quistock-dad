import axios, { isAxiosError, type AxiosResponse } from 'axios'

import { clearAuthToken, setAuthToken } from '@/services/auth-token'
import type { IAuthResponse, ICsrfResponse, ILoginPayload } from '@/types'
import { validateLoginCredentials } from '@/utils/validateForms'

const DEFAULT_LOGIN_ERROR = 'Erro ao realizar login.'

const authApiUrl: string =
  (import.meta.env.AUTH_API_URL as string | undefined)?.trim() ||
  'http://localhost:3000'

const authApi = axios.create({
  baseURL: authApiUrl,
  withCredentials: true,
})

export const getLoginErrorMessage = (error: unknown): string => {
  if (!isAxiosError<{ message?: string }>(error) || !error.response) {
    return DEFAULT_LOGIN_ERROR
  }

  const status = error.response.status
  const message = error.response.data?.message

  if (status === 401) {
    return 'E-mail ou senha inválidos.'
  }

  if (status === 403) {
    return message ?? 'Seu perfil não tem acesso a esta plataforma.'
  }

  return message ?? DEFAULT_LOGIN_ERROR
}

const getCsrfToken = async (): Promise<string> => {
  const { data } = await authApi.get<ICsrfResponse>('/csrf')
  if (typeof data?.token !== 'string' || data.token.length === 0) {
    throw new Error('A API de autenticação não retornou um token CSRF válido.')
  }
  return data.token
}

const persistToken = (
  response: AxiosResponse<IAuthResponse>,
): AxiosResponse<IAuthResponse> => {
  const token = response.data?.token

  if (typeof token === 'string' && token.length > 0) {
    setAuthToken(token)
  } else {
    clearAuthToken()
  }

  return response
}

export const postLogin = async ({
  email,
  password,
  platform = 'website',
}: ILoginPayload): Promise<AxiosResponse<IAuthResponse>> => {
  const validationErrors = validateLoginCredentials({ email, password })
  const validationError = validationErrors.email ?? validationErrors.password
  if (validationError) throw new Error(validationError)

  try {
    return persistToken(
      await authApi.post<IAuthResponse>('/login', {
        email: email.trim(),
        password,
        platform,
      }),
    )
  } catch (error) {
    throw new Error(getLoginErrorMessage(error), { cause: error })
  }
}

const requestRefresh = async (): Promise<AxiosResponse<IAuthResponse>> => {
  try {
    const token = await getCsrfToken()
    const response = await authApi.post<IAuthResponse>('/refresh', undefined, {
      headers: { 'X-CSRF-TOKEN': token },
    })
    return persistToken(response)
  } catch (error) {
    throw new Error('Não foi possível renovar a sessão.', { cause: error })
  }
}

let refreshRequest: Promise<AxiosResponse<IAuthResponse>> | null = null

export const postRefresh = (): Promise<AxiosResponse<IAuthResponse>> => {
  refreshRequest ??= requestRefresh().finally(() => {
    refreshRequest = null
  })

  return refreshRequest
}

export const postLogout = async (): Promise<AxiosResponse> => {
  try {
    const token = await getCsrfToken()
    return await authApi.post('/logout', undefined, {
      headers: { 'X-CSRF-TOKEN': token },
    })
  } catch (error) {
    throw new Error('Não foi possível encerrar a sessão.', { cause: error })
  } finally {
    clearAuthToken()
  }
}
