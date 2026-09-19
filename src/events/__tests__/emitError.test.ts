import type { Mock } from 'vitest'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import emitError from '../emitError'

interface NotificationEvent extends CustomEvent {
  detail: { type: string; message: string; id?: string }
}

describe('emitError', () => {
  beforeEach(() => {
    globalThis.dispatchEvent = vi.fn()
    globalThis.CustomEvent = class CustomEvent {
      type: string
      detail: unknown
      constructor(type: string, options?: { detail?: unknown }) {
        this.type = type
        this.detail = options?.detail
      }
    } as unknown as typeof CustomEvent
  })

  it('dispatches an error notification event', () => {
    emitError('Oops, an error occurred')

    expect(globalThis.dispatchEvent).toHaveBeenCalled()
    const event = (globalThis.dispatchEvent as Mock).mock.calls[0][0] as NotificationEvent
    expect(event.type).toBe('emitNotification')
    expect(event.detail.type).toBe('error')
    expect(event.detail.message).toBe('Oops, an error occurred')
  })

  it('dispatches an error notification with extra errors map', () => {
    emitError('Validation Error', { username: 'Too short' })

    const event = (globalThis.dispatchEvent as Mock).mock.calls[0][0] as NotificationEvent
    expect(event.detail.type).toBe('error')
    expect(event.detail.message).toContain('Validation Error')
    expect(event.detail.message).toContain('Too short')
  })
})
