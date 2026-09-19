// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { cleanDocument } from '../cleanDocument'

describe('cleanDocument', () => {
  it('removes hyphens and dots from input value', () => {
    const event = { target: { value: '123.456.789-00' } } as any
    expect(cleanDocument(event)).toBe('12345678900')
  })

  it('handles empty value', () => {
    const event = { target: { value: '' } } as any
    expect(cleanDocument(event)).toBe('')
  })

  it('handles undefined or null value safely', () => {
    const event = { target: {} } as any
    expect(cleanDocument(event)).toBeUndefined()
  })
})
