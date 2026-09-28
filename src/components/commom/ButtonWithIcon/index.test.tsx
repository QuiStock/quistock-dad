import { screen } from '@testing-library/react'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { describe, it, expect } from 'vitest'
import { ButtonWithIcon } from './index'

describe('ButtonWithIcon', () => {
  it('renders correctly', () => {
    renderWithTheme(
      <ButtonWithIcon icon={<span data-testid="icon">Icon</span>}>
        Click Me
      </ButtonWithIcon>,
    )
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
