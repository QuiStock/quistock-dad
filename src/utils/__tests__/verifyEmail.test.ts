// @vitest-environment node
import { describe, expect, it } from 'vitest'
import verifyEmail from '../verifyEmail'

describe('verifyEmail', () => {
  it('accepts valid email addresses', () => {
    expect(verifyEmail('test@example.com')).toBe(true)
    expect(verifyEmail('user.name+tag@example.co.uk')).toBe(true)
    expect(verifyEmail('123@123.com')).toBe(true)
  })

  it('rejects invalid email addresses', () => {
    expect(verifyEmail('test@example')).toBe(false)
    expect(verifyEmail('testexample.com')).toBe(false)
    expect(verifyEmail('@example.com')).toBe(false)
    expect(verifyEmail('test@.com')).toBe(false)
    expect(verifyEmail('test@example.')).toBe(false)
  })

  it('handles empty and malformed input', () => {
    expect(verifyEmail('')).toBe(false)
    expect(verifyEmail(' ')).toBe(false)
  })
})
