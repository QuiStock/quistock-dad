import { screen } from '@testing-library/react'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { describe, it, expect } from 'vitest'
import { ButtonComponent } from './index'

describe('ButtonComponent', () => {
  it('renders correctly', () => {
    renderWithTheme(<ButtonComponent>Click Me</ButtonComponent>)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
