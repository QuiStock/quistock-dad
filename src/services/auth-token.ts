const AUTH_TOKEN_KEY = 'quistock.auth.token'

export const getAuthToken = (): string | null =>
  window.localStorage.getItem(AUTH_TOKEN_KEY)

export const setAuthToken = (token: string): void => {
  window.localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const clearAuthToken = (): void => {
  window.localStorage.removeItem(AUTH_TOKEN_KEY)
}

export const isAuthTokenExpired = (token: string): boolean => {
  const payload = token.split('.')[1]
  if (!payload) return false

  try {
    const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/')
    const paddedPayload = normalizedPayload.padEnd(
      Math.ceil(normalizedPayload.length / 4) * 4,
      '=',
    )
    const { exp } = JSON.parse(atob(paddedPayload)) as { exp?: unknown }

    return typeof exp === 'number' && exp * 1000 <= Date.now()
  } catch {
    return false
  }
}
