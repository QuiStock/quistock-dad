// @vitest-environment node
import type { Mock } from 'vitest'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import emitNotification from '../emitNotification'
import type { INotificationProps } from '@/types'

interface NotificationEvent extends CustomEvent {
  detail: { type: string; message: string; id?: string }
}

describe('emitNotification', () => {
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

  it('dispatches a notification event with message', () => {
    emitNotification({
      type: 'success',
      message: 'It worked!',
    })

    expect(globalThis.dispatchEvent).toHaveBeenCalled()
    const event = (globalThis.dispatchEvent as Mock).mock
      .calls[0][0] as NotificationEvent
    expect(event.type).toBe('emitNotification')
    expect(event.detail.type).toBe('success')
    expect(event.detail.message).toBe('It worked!')
    expect(event.detail.id).toBeDefined()
  })

  it('handles errors object and appends to message', () => {
    emitNotification({
      id: 'custom-id',
      type: 'error',
      message: 'Validation failed',
      errors: { field1: 'Required field', field2: '' },
    })

    const event = (globalThis.dispatchEvent as Mock).mock
      .calls[0][0] as NotificationEvent
    expect(event.detail.id).toBe('custom-id')
    expect(event.detail.message).toContain('Validation failed')
    expect(event.detail.message).toContain('Required field')
  })

  it('handles empty message and errors', () => {
    emitNotification({
      type: 'info',
    } as unknown as INotificationProps)

    const event = (globalThis.dispatchEvent as Mock).mock
      .calls[0][0] as NotificationEvent
    expect(event.detail.message).toBe('')
  })
})
