import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import { RowActionMenu } from './index'

const openMenu = () =>
  fireEvent.click(screen.getByRole('button', { name: 'Abrir ações' }))

describe('RowActionMenu', () => {
  it('shows only the view page option when onDetails is omitted', () => {
    const onViewPage = vi.fn()
    render(
      <ThemeProvider theme={theme}>
        <RowActionMenu onViewPage={onViewPage} />
      </ThemeProvider>,
    )
    openMenu()

    expect(screen.queryByText('Detalhes')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Ver detalhes'))
    expect(onViewPage).toHaveBeenCalledTimes(1)
  })

  it('shows only the details option when onViewPage is omitted', () => {
    const onDetails = vi.fn()
    render(
      <ThemeProvider theme={theme}>
        <RowActionMenu onDetails={onDetails} />
      </ThemeProvider>,
    )
    openMenu()

    expect(screen.queryByText('Ver detalhes')).not.toBeInTheDocument()
    fireEvent.click(screen.getByText('Detalhes'))
    expect(onDetails).toHaveBeenCalledTimes(1)
  })
})
