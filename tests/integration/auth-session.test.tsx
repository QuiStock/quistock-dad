import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAuth } from '@/contexts/AuthContext'
import { AuthProvider } from '@/contexts/AuthProvider'
import { postLogout } from '@/services/api-auth'
import { coreApi } from '@/services/api-client'
import { server } from '@test/mocks/server'

const TOKEN_KEY = 'quistock.auth.token'

const readStoredToken = (): string | null => {
  const storedValue = window.localStorage.getItem(TOKEN_KEY)
  if (!storedValue) return null

  const parsedValue: unknown = JSON.parse(storedValue)
  if (
    typeof parsedValue === 'object' &&
    parsedValue !== null &&
    '_versao' in parsedValue &&
    parsedValue._versao === 1 &&
    'token' in parsedValue &&
    typeof parsedValue.token === 'string'
  ) {
    return parsedValue.token
  }

  return null
}

const createToken = (expiresAt: number) => {
  const payload = btoa(JSON.stringify({ exp: expiresAt }))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')

  return `header.${payload}.signature`
}

const AuthStatus = () => {
  const { isAuthenticated, isLoading, login } = useAuth()

  return (
    <>
      <output>
        {isLoading
          ? 'loading'
          : isAuthenticated
            ? 'authenticated'
            : 'anonymous'}
      </output>
      <button onClick={() => void login('user@example.com', 'password')}>
        Login
      </button>
    </>
  )
}

const renderAuthProvider = () =>
  render(
    <AuthProvider>
      <AuthStatus />
    </AuthProvider>,
  )

describe('AuthProvider', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('restores an unexpired token without calling refresh', async () => {
    const refreshRequest = vi.fn()
    const requestWithToken = vi.fn()
    window.localStorage.setItem(
      TOKEN_KEY,
      createToken(Math.floor(Date.now() / 1000) + 60),
    )
    server.use(
      http.post('*/refresh', () => {
        refreshRequest()
        return HttpResponse.json({ success: true })
      }),
      http.get('*/profile', ({ request }) => {
        requestWithToken(request.headers.get('Authorization'))
        return HttpResponse.json({})
      }),
    )

    renderAuthProvider()
    expect(await screen.findByText('authenticated')).toBeInTheDocument()
    await act(async () => {
      await coreApi.get('/profile')
    })

    expect(refreshRequest).not.toHaveBeenCalled()
    expect(requestWithToken).toHaveBeenCalledOnce()
    expect(requestWithToken.mock.calls[0]?.[0]).toMatch(
      /^Bearer header\.[A-Za-z0-9_-]+\.signature$/,
    )
  })

  it('refreshes an expired token and persists the replacement', async () => {
    const refreshedToken = createToken(Math.floor(Date.now() / 1000) + 120)
    const refreshRequest = vi.fn()
    const csrfRequest = vi.fn()
    window.localStorage.setItem(
      TOKEN_KEY,
      createToken(Math.floor(Date.now() / 1000) - 60),
    )
    server.use(
      http.get('*/csrf', ({ request }) => {
        csrfRequest(request.credentials)
        return HttpResponse.json({ token: 'auth-csrf-token' })
      }),
      http.post('*/refresh', ({ request }) => {
        refreshRequest(request.headers.get('X-CSRF-TOKEN'))
        return HttpResponse.json({ token: refreshedToken })
      }),
    )

    renderAuthProvider()

    expect(await screen.findByText('authenticated')).toBeInTheDocument()
    expect(refreshRequest).toHaveBeenCalledOnce()
    expect(refreshRequest).toHaveBeenCalledWith('auth-csrf-token')
    expect(csrfRequest).toHaveBeenCalledWith('include')
    expect(readStoredToken()).toBe(refreshedToken)
  })

  it('fetches the Auth CSRF token and sends it on logout', async () => {
    const logoutRequest = vi.fn()
    server.use(
      http.get('*/csrf', () =>
        HttpResponse.json({ token: 'logout-csrf-token' }),
      ),
      http.post('*/logout', ({ request }) => {
        logoutRequest(request.headers.get('X-CSRF-TOKEN'))
        return HttpResponse.json({ success: true })
      }),
    )

    await postLogout()

    expect(logoutRequest).toHaveBeenCalledWith('logout-csrf-token')
  })

  it('persists the token returned by login', async () => {
    renderAuthProvider()
    expect(await screen.findByText('authenticated')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(readStoredToken()).toBe('mock-token')
    })
  })
})
