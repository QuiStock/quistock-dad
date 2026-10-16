import { expect, test } from '@playwright/test'

test('loads the production bundle and supports its primary interaction', async ({
  page,
}) => {
  const unexpectedConsoleErrors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') {
      unexpectedConsoleErrors.push(message.text())
    }
  })
  // Mock auth API calls when the backend is not running (e.g. in CI).
  await page.route('**/csrf', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ token: 'test-csrf-token' }),
    })
  })
  await page.route('**/refresh', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })
  await page.route('**/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'e2e-user',
        name: 'E2E User',
        email: 'e2e@example.com',
        role: 'ADMIN',
        status: 'ACTIVE',
        profile_photo_url: null,
        store_id: null,
        store_code: null,
        store_name: null,
        region_id: null,
        region_code: null,
        region_name: null,
      }),
    })
  })

  await page.goto('/nao-existe-essa-rota')

  // Verify the NotFound page renders on an unknown route
  await expect(page.getByText('Página não encontrada...')).toBeVisible()

  const backButton = page.getByRole('button', { name: 'Voltar' })
  await expect(backButton).toBeVisible()

  expect(unexpectedConsoleErrors).toEqual([])
})
