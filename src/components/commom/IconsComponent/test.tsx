import { renderWithTheme } from '@/utils/__tests__/helpers'
import { screen } from '@testing-library/react'
import { IconsComponent } from '.'
import { describe, expect, it } from 'vitest'

describe('<IconsComponent />', () => {
  it('Should be render', () => {
    renderWithTheme(
      <IconsComponent type="Award">
        <p>Teste de conteúdo</p>
      </IconsComponent>,
    )

    expect(screen.getByText('Teste de conteúdo'))
  })
})
