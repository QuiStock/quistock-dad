import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAuth } from '@/contexts/AuthContext'
import { AuthProvider } from '@/contexts/AuthProvider'
import { coreApi } from '@/services/api-client'
import { server } from '@test/mocks/server'

const TOKEN_KEY = 'quistock.auth.token'

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
    expect(requestWithToken).toHaveBeenCalledWith(
      `Bearer ${window.localStorage.getItem(TOKEN_KEY)}`,
    )
  })

  it('refreshes an expired token and persists the replacement', async () => {
    const refreshedToken = createToken(Math.floor(Date.now() / 1000) + 120)
    const refreshRequest = vi.fn()
    window.localStorage.setItem(
      TOKEN_KEY,
      createToken(Math.floor(Date.now() / 1000) - 60),
    )
    server.use(
      http.post('*/refresh', () => {
        refreshRequest()
        return HttpResponse.json({ token: refreshedToken })
      }),
    )

    renderAuthProvider()

    expect(await screen.findByText('authenticated')).toBeInTheDocument()
    expect(refreshRequest).toHaveBeenCalledOnce()
    expect(window.localStorage.getItem(TOKEN_KEY)).toBe(refreshedToken)
  })

  it('persists the token returned by login', async () => {
    renderAuthProvider()
    fireEvent.click(screen.getByRole('button', { name: 'Login' }))

    await waitFor(() => {
      expect(window.localStorage.getItem(TOKEN_KEY)).toBe('mock-token')
    })
  })
})
