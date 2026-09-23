import { renderWithTheme } from '@/utils/__tests__/helpers'
import { screen } from '@testing-library/react'
import { Add } from '@mui/icons-material'
import { ButtonWithIcon } from '.'
import { describe, it, expect } from 'vitest'

describe('<ButtonWithIcon />', () => {
  it('should be rendered', () => {
    renderWithTheme(<ButtonWithIcon icon={<Add />}>Adicionar</ButtonWithIcon>)

    expect(screen.getByText('Adicionar')).toBeInTheDocument()
  })
})
