import axios, { type AxiosResponse } from 'axios'
import { clearAuthToken, setAuthToken } from '@/services/auth-token'

export type AuthPlatform = 'mobile' | 'website'

interface IAuthResponse {
  token?: unknown
}

interface ICsrfResponse {
  token?: unknown
}

const authApiUrl: string =
  (import.meta.env.AUTH_API_URL as string | undefined)?.trim() ||
  'http://localhost:3000'

const authApi = axios.create({
  baseURL: authApiUrl,
  withCredentials: true,
})

const getCsrfToken = async (): Promise<string> => {
  const { data } = await authApi.get<ICsrfResponse>('/csrf')
  if (typeof data?.token !== 'string' || data.token.length === 0) {
    throw new Error('A API de autenticação não retornou um token CSRF válido.')
  }
  return data.token
}

const persistToken = (response: AxiosResponse<IAuthResponse>) => {
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
}: {
  email: string
  password: string
  platform?: AuthPlatform
}) =>
  persistToken(
    await authApi.post<IAuthResponse>('/login', { email, password, platform }),
  )

let refreshRequest: Promise<AxiosResponse<IAuthResponse>> | null = null

export const postRefresh = (): Promise<AxiosResponse<IAuthResponse>> => {
  refreshRequest ??= getCsrfToken()
    .then((token) =>
      authApi.post<IAuthResponse>('/refresh', undefined, {
        headers: { 'X-CSRF-TOKEN': token },
      }),
    )
    .then(persistToken)
    .finally(() => {
      refreshRequest = null
    })

  return refreshRequest
}

export const postLogout = async () => {
  try {
    const token = await getCsrfToken()
    return await authApi.post('/logout', undefined, {
      headers: { 'X-CSRF-TOKEN': token },
    })
  } finally {
    clearAuthToken()
  }
}
