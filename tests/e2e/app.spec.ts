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
  // Mock API calls to prevent connection refused errors when backend is not running (e.g. in CI)
  await page.route('**/refresh', (route) => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    })
  })

  await page.goto('/nao-existe-essa-rota')

  // Verify the NotFound page renders on an unknown route
  await expect(page.getByText('Página não encontrada...')).toBeVisible()

  const backButton = page.getByRole('button', { name: 'Voltar' })
  await expect(backButton).toBeVisible()

  expect(unexpectedConsoleErrors).toEqual([])
})
