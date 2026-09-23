import { describe, expect, it } from 'vitest'
import { MIN_LENGTH_TO_RUN_SEARCH, timeToSearch } from '@/utils/constants'

describe('Search constants', () => {
  it('defines the correct debounce time for search', () => {
    expect(timeToSearch).toBe(1000)
    expect(typeof timeToSearch).toBe('number')
  })

  it('defines the minimum length required to trigger a search', () => {
    expect(MIN_LENGTH_TO_RUN_SEARCH).toBe(3)
    expect(typeof MIN_LENGTH_TO_RUN_SEARCH).toBe('number')
  })
})
