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

  await expect(
    page.getByRole('heading', { level: 1, name: 'Get started' }),
  ).toBeVisible()

  const counter = page.getByRole('button', { name: 'Count is 0' })
  await counter.click()
  await expect(page.getByRole('button', { name: 'Count is 1' })).toBeVisible()

  expect(unexpectedConsoleErrors).toEqual([])
})
