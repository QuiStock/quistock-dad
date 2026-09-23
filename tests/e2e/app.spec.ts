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

  await page.goto('/')

  // Verify the NotFound page renders on the root route
  await expect(page.getByText('Página não encontrada...')).toBeVisible()

  const backButton = page.getByRole('button', { name: 'Voltar' })
  await expect(backButton).toBeVisible()

  expect(unexpectedConsoleErrors).toEqual([])
})
