import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { InternalAxiosRequestConfig } from 'axios'

beforeEach(() => {
  vi.resetModules()
  window.localStorage.clear()
})

afterEach(() => {
  vi.unstubAllEnvs()
})

async function clientFor(authUrl: string, coreUrl: string) {
  vi.stubEnv('AUTH_API_URL', authUrl)
  vi.stubEnv('CORE_API_URL', coreUrl)
  const { setAuthToken } = await import('@/services/auth-token')
  setAuthToken('synthetic-access-token')
  const { coreApi } = await import('@/services/api-client')
  const requests: InternalAxiosRequestConfig[] = []
  coreApi.defaults.adapter = (config) => {
    requests.push(config)
    return Promise.resolve({
      data: config.url === '/csrf' ? { token: 'synthetic-csrf' } : {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    })
  }
  return { coreApi, requests }
}

describe('Core authentication transport', () => {
  it('uses only first-party cookies when website, Auth and Core share an origin', async () => {
    const origin = window.location.origin
    const { coreApi, requests } = await clientFor(
      `${origin}/auth`,
      `${origin}/api`,
    )
    await coreApi.get('/profile')
    expect(requests[0].withCredentials).toBe(true)
    expect(requests[0].headers.get('Authorization')).toBeUndefined()
  })

  it('keeps CSRF protection on cookie-authenticated mutations', async () => {
    const origin = window.location.origin
    const { coreApi, requests } = await clientFor(
      `${origin}/auth`,
      `${origin}/api`,
    )
    await coreApi.post('/unit-test-only', {})
    const mutation = requests.find((request) => request.method === 'post')!
    expect(mutation.withCredentials).toBe(true)
    expect(mutation.headers.get('Authorization')).toBeUndefined()
    expect(mutation.headers.get('X-XSRF-TOKEN')).toBe('synthetic-csrf')
  })

  it('uses Bearer without cross-origin cookies for separate API origins', async () => {
    const { coreApi, requests } = await clientFor(
      'https://auth.example.invalid',
      'https://core.example.invalid',
    )
    await coreApi.get('/profile')
    expect(requests[0].withCredentials).toBe(false)
    expect(requests[0].headers.get('Authorization')).toBe(
      'Bearer synthetic-access-token',
    )
  })

  it('uses Bearer when a shared API gateway differs from the website origin', async () => {
    const { coreApi, requests } = await clientFor(
      'https://gateway.example.invalid/auth',
      'https://gateway.example.invalid/api',
    )
    await coreApi.get('/profile')
    expect(requests[0].withCredentials).toBe(false)
    expect(requests[0].headers.get('Authorization')).toBe(
      'Bearer synthetic-access-token',
    )
  })
})
