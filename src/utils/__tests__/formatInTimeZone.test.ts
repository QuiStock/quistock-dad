// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { formatInTimeZone } from '../formatInTimeZone'

describe('formatInTimeZone', () => {
  it('returns null for falsy input', () => {
    expect(formatInTimeZone(null)).toBeNull()
    expect(formatInTimeZone(undefined)).toBeNull()
    expect(formatInTimeZone('')).toBeNull()
  })

  it('returns null for invalid date strings', () => {
    expect(formatInTimeZone('invalid-date')).toBeNull()
  })

  it('formats valid date as string (dd/MM/yyyy)', () => {
    // 2023-10-15 UTC
    expect(formatInTimeZone('2023-10-15T12:00:00Z')).toBe('15/10/2023')
  })

  it('returns Date object when getDate is true', () => {
    const result = formatInTimeZone('2023-10-15T12:00:00Z', true)
    expect(result).toBeInstanceOf(Date)
    if (result instanceof Date) {
      expect(result.getFullYear()).toBe(2023)
      expect(result.getMonth()).toBe(9) // 0-indexed month
      expect(result.getDate()).toBe(15)
    }
  })
})
