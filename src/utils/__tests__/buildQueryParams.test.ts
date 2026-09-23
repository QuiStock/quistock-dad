import { describe, expect, it } from 'vitest'
import { buildQueryParams } from '@/utils/buildQueryParams'

describe('buildQueryParams', () => {
  it('builds a query string with valid string, number, and boolean values', () => {
    const params = { page: 1, search: 'test', active: true }
    const result = buildQueryParams(params)

    expect(result).toBe('?page=1&search=test&active=true')
  })

  it('ignores null and undefined values', () => {
    const params = { id: 10, filter: null, sort: undefined }
    const result = buildQueryParams(params)

    expect(result).toBe('?id=10')
  })

  it('ignores empty strings and whitespace-only strings', () => {
    const params = { query: 'react', category: '', tags: '   ' }
    const result = buildQueryParams(params)

    expect(result).toBe('?query=react')
  })

  it('ignores NaN but keeps falsy values like 0 and false', () => {
    const params = { count: 0, isValid: false, invalidNumber: NaN }
    const result = buildQueryParams(params)

    expect(result).toBe('?count=0&isValid=false')
  })

  it('returns an empty string if all parameters are filtered out', () => {
    const params = { a: null, b: undefined, c: '', d: '   ', e: NaN }
    const result = buildQueryParams(params)

    expect(result).toBe('')
  })

  it('returns an empty string if the object is empty', () => {
    const result = buildQueryParams({})

    expect(result).toBe('')
  })

  it('correctly encodes URL special characters', () => {
    const params = { q: 'hello world', tag: 'foo&bar' }
    const result = buildQueryParams(params)

    // O URLSearchParams codifica espaços como '+' e '&' como '%26'
    expect(result).toBe('?q=hello+world&tag=foo%26bar')
  })
})
