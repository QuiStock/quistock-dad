// @vitest-environment node
import { describe, expect, it, vi, beforeEach } from 'vitest'
import emitError from '../emitError'

describe('emitError', () => {
  beforeEach(() => {
    globalThis.dispatchEvent = vi.fn()
    globalThis.CustomEvent = class CustomEvent {
      type: string
      detail: any
      constructor(type: string, options?: any) {
        this.type = type
        this.detail = options?.detail
      }
    } as any
  })

  it('dispatches an error notification event', () => {
    emitError('Oops, an error occurred')

    expect(globalThis.dispatchEvent).toHaveBeenCalled()
    const event = (globalThis.dispatchEvent as any).mock.calls[0][0]
    expect(event.type).toBe('emitNotification')
    expect(event.detail.type).toBe('error')
    expect(event.detail.message).toBe('Oops, an error occurred')
  })

  it('dispatches an error notification with extra errors map', () => {
    emitError('Validation Error', { username: 'Too short' })

    const event = (globalThis.dispatchEvent as any).mock.calls[0][0]
    expect(event.detail.type).toBe('error')
    expect(event.detail.message).toContain('Validation Error')
    expect(event.detail.message).toContain('Too short')
  })
})
