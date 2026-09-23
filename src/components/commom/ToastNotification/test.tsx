import { renderWithTheme } from '@/utils/__tests__/helpers'
import { screen } from '@testing-library/react'
import { ToastNotification } from '.'
import { describe, expect, it } from 'vitest'

describe('<ToastNotification />', () => {
  it('Should be render', () => {
    renderWithTheme(
      <ToastNotification
        notifications={[
          { id: '1', type: 'error', message: 'mensagem de erro' },
        ]}
      />,
    )

    expect(screen.getAllByText('mensagem de erro')[0]).toBeInTheDocument()
  })
})
