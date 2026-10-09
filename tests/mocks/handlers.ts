import { http, HttpResponse } from 'msw'

import { healthyApiResponse } from '@test/fixtures/health'

export const handlers = [
  http.get('https://api.example.test/health', () =>
    HttpResponse.json(healthyApiResponse),
  ),
  http.post('*/refresh', () => HttpResponse.json({ success: true })),
  http.post('*/login', () =>
    HttpResponse.json({ success: true, token: 'mock-token' }),
  ),
]
