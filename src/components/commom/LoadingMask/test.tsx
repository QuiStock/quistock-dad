import { screen } from '@testing-library/react'
import { LoadingMask } from '.'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { describe, it, expect } from 'vitest'

describe('<LoadingMask />', () => {
  it('Should be rendered when isLoading = true', () => {
    renderWithTheme(<LoadingMask isLoading={true} />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('Should not be renderd when isLoading = false', () => {
    renderWithTheme(<LoadingMask isLoading={false} />)

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
