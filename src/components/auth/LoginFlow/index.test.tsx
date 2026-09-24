import { screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { LoginFlow } from '.'

describe('<LoginFlow />', () => {
  it('should render the Logo and BoxLogin components', () => {
    renderWithTheme(<LoginFlow />)

    // Check if logo is rendered by its alt text
    expect(screen.getByAltText('Logo Quistock')).toBeInTheDocument()

    // Check if BoxLogin is rendered by checking one of its texts
    expect(screen.getByText('Entre agora!')).toBeInTheDocument()
  })
})
