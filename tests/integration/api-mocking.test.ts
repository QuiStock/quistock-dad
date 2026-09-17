import { describe, expect, it } from 'vitest'

import { healthyApiResponse } from '@test/fixtures/health'

describe('external API test boundary', () => {
  it('uses a deterministic mocked response instead of the network', async () => {
    const response = await fetch('https://api.example.test/health')

    await expect(response.json()).resolves.toEqual(healthyApiResponse)
  })
})
