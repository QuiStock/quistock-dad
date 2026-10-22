import { beforeEach, describe, expect, it } from 'vitest'

import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from '@/services/auth-token'

const AUTH_TOKEN_KEY = 'quistock.auth.token'

describe('auth-token storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('stores and reads tokens in the current versioned schema', () => {
    setAuthToken('token-value')

    expect(
      JSON.parse(window.localStorage.getItem(AUTH_TOKEN_KEY) ?? ''),
    ).toEqual({ _versao: 1, token: 'token-value' })
    expect(getAuthToken()).toBe('token-value')
  })

  it('migrates existing raw token values to the current schema', () => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, 'legacy-token')

    expect(getAuthToken()).toBe('legacy-token')
    expect(
      JSON.parse(window.localStorage.getItem(AUTH_TOKEN_KEY) ?? ''),
    ).toEqual({ _versao: 1, token: 'legacy-token' })
  })

  it('discards malformed and unsupported stored versions', () => {
    window.localStorage.setItem(AUTH_TOKEN_KEY, '{invalid json')
    expect(getAuthToken()).toBeNull()
    expect(window.localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull()

    window.localStorage.setItem(
      AUTH_TOKEN_KEY,
      JSON.stringify({ _versao: 2, token: 'future-token' }),
    )
    expect(getAuthToken()).toBeNull()
    expect(window.localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull()
  })

  it('removes the complete versioned token record on logout', () => {
    setAuthToken('token-value')
    clearAuthToken()

    expect(window.localStorage.getItem(AUTH_TOKEN_KEY)).toBeNull()
  })
})
