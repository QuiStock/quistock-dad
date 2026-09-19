// @vitest-environment node
import { describe, expect, it, vi, beforeEach } from 'vitest'
import emitNotification from '../emitNotification'

describe('emitNotification', () => {
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

  it('dispatches a notification event with message', () => {
    emitNotification({
      type: 'success',
      message: 'It worked!',
    })

    expect(globalThis.dispatchEvent).toHaveBeenCalled()
    const event = (globalThis.dispatchEvent as any).mock.calls[0][0]
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

    const event = (globalThis.dispatchEvent as any).mock.calls[0][0]
    expect(event.detail.id).toBe('custom-id')
    expect(event.detail.message).toContain('Validation failed')
    expect(event.detail.message).toContain('Required field')
  })

  it('handles empty message and errors', () => {
    emitNotification({
      type: 'info',
    } as any)

    const event = (globalThis.dispatchEvent as any).mock.calls[0][0]
    expect(event.detail.message).toBe('')
  })
})
