import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import App from '../../src/App'

describe('App', () => {
  it('renders the starter content', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Get started' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Count is 0' })).toBeVisible()
  })

  it('increments the counter through a user interaction', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Count is 0' }))

    expect(screen.getByRole('button', { name: 'Count is 1' })).toBeVisible()
  })
})
