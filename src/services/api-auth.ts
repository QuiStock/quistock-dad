import axios, { type AxiosResponse } from 'axios'
import { clearAuthToken, setAuthToken } from '@/services/auth-token'

export type AuthPlatform = 'mobile' | 'website'

interface IAuthResponse {
  token?: unknown
}

const authApiUrl: string =
  (import.meta.env.AUTH_API_URL as string | undefined)?.trim() ||
  'http://localhost:3000'

const authApi = axios.create({
  baseURL: authApiUrl,
  withCredentials: true,
})

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
  refreshRequest ??= authApi
    .post<IAuthResponse>('/refresh')
    .then(persistToken)
    .finally(() => {
      refreshRequest = null
    })

  return refreshRequest
}

export const postLogout = async () => {
  try {
    return await authApi.post('/logout')
  } finally {
    clearAuthToken()
  }
}
