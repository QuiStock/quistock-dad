// @vitest-environment node
import { describe, expect, it } from 'vitest'
import verifyDate from '../verifyDate'

describe('verifyDate', () => {
  it('returns undefined if value is falsy', () => {
    expect(verifyDate(null)).toBeUndefined()
    expect(verifyDate(undefined)).toBeUndefined()
    expect(verifyDate('')).toBeUndefined()
  })

  it('adds 3 hours to a valid Date object', () => {
    const originalDate = new Date('2023-01-01T10:00:00Z')
    const result = verifyDate(originalDate)
    expect(result?.toISOString()).toBe('2023-01-01T13:00:00.000Z')
  })

  it('adds 3 hours to a valid date string', () => {
    const result = verifyDate('2023-01-01T10:00:00Z')
    expect(result?.toISOString()).toBe('2023-01-01T13:00:00.000Z')
  })
})
