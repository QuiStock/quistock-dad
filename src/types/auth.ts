export type TAuthPlatform = 'mobile' | 'website'

export interface IAuthResponse {
  token?: unknown
}

export interface ICsrfResponse {
  token?: unknown
}

export interface ILoginPayload {
  email: string
  password: string
  platform?: TAuthPlatform
}

export interface ILoginCredentials {
  email: string
  password: string
}
