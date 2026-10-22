const AUTH_TOKEN_KEY = 'quistock.auth.token'
const AUTH_TOKEN_VERSION = 1

interface IStoredAuthToken {
  _versao: typeof AUTH_TOKEN_VERSION
  token: string
}

const isStoredAuthToken = (value: unknown): value is IStoredAuthToken => {
  if (typeof value !== 'object' || value === null) return false

  const storedValue = value as Partial<IStoredAuthToken>
  return (
    storedValue._versao === AUTH_TOKEN_VERSION &&
    typeof storedValue.token === 'string' &&
    storedValue.token.length > 0
  )
}

export const getAuthToken = (): string | null => {
  const storedValue = window.localStorage.getItem(AUTH_TOKEN_KEY)
  if (!storedValue) return null

  if (!storedValue.startsWith('{') && !storedValue.startsWith('[')) {
    setAuthToken(storedValue)
    return storedValue
  }

  try {
    const parsedValue: unknown = JSON.parse(storedValue)
    if (isStoredAuthToken(parsedValue)) return parsedValue.token
  } catch {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    return null
  }

  window.localStorage.removeItem(AUTH_TOKEN_KEY)
  return null
}

export const setAuthToken = (token: string): void => {
  const value: IStoredAuthToken = {
    _versao: AUTH_TOKEN_VERSION,
    token,
  }
  window.localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(value))
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
