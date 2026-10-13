import { http, HttpResponse } from 'msw'

import { healthyApiResponse } from '@test/fixtures/health'

export const mockProfileResponse = {
  id: '42',
  name: 'Ana Silva',
  email: 'ana@example.com',
  role: 'GERENTE',
  status: 'ACTIVE',
  profile_photo_url: null,
  store_id: '17',
  store_code: 'FIL001',
  store_name: 'Santana Store',
  region_id: '3',
  region_code: 'REGION-NORTH',
  region_name: 'Região Norte',
}

export const mockManagersListResponse = [
  {
    id: '42',
    name: 'Ana Silva',
    email: 'ana@example.com',
    role: 'GERENTE',
    status: 'ACTIVE',
    profile_photo_url: null,
    store_id: '17',
    store_code: 'FIL001',
    store_name: 'Santana Store',
    region_id: null,
    region_code: null,
    region_name: null,
  },
]

export const mockBranchesResponse = [
  {
    id: 'FIL001',
    store_id: 17,
    name: 'Downtown Store',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    latitude: null,
    longitude: null,
  },
]

export const mockDashboardSummaryResponse = {
  total_products: 45,
  high_risk_products: 6,
  medium_risk_products: 25,
  low_risk_products: 14,
  suggested_actions: 12,
  suggested_promotions: 8,
  suggested_stock_orders: 4,
  near_expiry_products: 10,
  stockout_products: 3,
  overstock_products: 11,
  active_actions: 15,
}

export const handlers = [
  http.get('https://api.example.test/health', () =>
    HttpResponse.json(healthyApiResponse),
  ),
  http.post('*/refresh', () => HttpResponse.json({ success: true })),
  http.post('*/login', () =>
    HttpResponse.json({ success: true, token: 'mock-token' }),
  ),
  http.post('*/logout', () => HttpResponse.json({ success: true })),
  http.get('*/csrf', () => HttpResponse.json({ token: 'mock-csrf-token' })),
  http.get('*/profile', () => HttpResponse.json(mockProfileResponse)),
  http.get('*/managers', () => HttpResponse.json(mockManagersListResponse)),
  http.post('*/managers', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>
    return HttpResponse.json(
      {
        id: '99',
        name: body.name ?? 'Novo Gerente',
        email: body.email ?? 'gerente@example.com',
        role: 'GERENTE',
        status: 'ACTIVE',
        profile_photo_url: null,
        store_id: null,
        store_code: null,
        store_name: null,
        region_id: null,
        region_code: null,
        region_name: null,
      },
      { status: 201 },
    )
  }),
  http.patch('*/managers/:id', async ({ request, params }) => {
    const body = (await request.json()) as Record<string, unknown>
    return HttpResponse.json({
      id: String(params.id),
      name: body.name ?? 'Gerente Atualizado',
      email: body.email ?? 'gerente@example.com',
      role: 'GERENTE',
      status: body.status ?? 'ACTIVE',
      profile_photo_url: null,
      store_id: null,
      store_code: null,
      store_name: null,
      region_id: null,
      region_code: null,
      region_name: null,
    })
  }),
  http.get('*/branches', () => HttpResponse.json(mockBranchesResponse)),
  http.get('*/dashboard/summary', () =>
    HttpResponse.json(mockDashboardSummaryResponse),
  ),
]
