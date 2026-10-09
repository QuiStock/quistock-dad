import axios from 'axios'

export type AuthPlatform = 'mobile' | 'website'

const authApiUrl: string =
  (import.meta.env.AUTH_API_URL as string | undefined) ??
  'http://localhost:3000'

const authApi = axios.create({
  baseURL: authApiUrl,
  withCredentials: true,
})

export const postLogin = ({
  email,
  password,
  platform = 'website',
}: {
  email: string
  password: string
  platform?: AuthPlatform
}) => authApi.post('/login', { email, password, platform })

export const postRefresh = () => authApi.post('/refresh')

export const postLogout = () => authApi.post('/logout')
