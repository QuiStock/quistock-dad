import { screen } from '@testing-library/react'
import SearchIcon from '@mui/icons-material/Search'
import { TextInputWithIcon } from '.'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { describe, it, expect } from 'vitest'

describe('<TextInputWithIcon />', () => {
  it('should be rendered', () => {
    renderWithTheme(
      <TextInputWithIcon icon={<SearchIcon />} label="Pesquisar por curso" />,
    )

    expect(screen.getAllByText('Pesquisar por curso')[0]).toBeInTheDocument()
  })
})
