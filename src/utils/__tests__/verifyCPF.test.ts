// @vitest-environment node
import { describe, expect, it } from 'vitest'
import verifyCPF from '../verifyCPF'

describe('verifyCPF', () => {
  it('accepts a valid CPF', () => {
    expect(verifyCPF('529.982.247-25')).toBe(true)
    // Testing another valid one
    expect(verifyCPF('000.000.000-00')).toBe(false) // All zeros are usually rejected by regex match
  })

  it('rejects an invalid CPF', () => {
    expect(verifyCPF('529.982.247-26')).toBe(false)
  })

  it('rejects malformed input', () => {
    expect(verifyCPF('')).toBe(false)
    expect(verifyCPF('abc')).toBe(false)
    expect(verifyCPF('123')).toBe(false) // Length !== 11
  })
})
