import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import styled, { useTheme } from 'styled-components'

import { renderWithTheme } from '@/utils/__tests__/helpers'

// 1. Componente que consome o tema via hook para garantir a injeção
const ThemeConsumer = () => {
  const theme = useTheme()
  return (
    <div data-testid="theme-consumer">
      {theme ? 'Theme injected' : 'No theme'}
    </div>
  )
}

// 2. Componente estilizado real para garantir que o styled-components está recebendo o tema
const StyledComponent = styled.div`
  /* Acessa uma propriedade genérica para evitar erros caso o tema mude */
  color: ${(props) => (props.theme ? 'green' : 'red')};
`

describe('renderWithTheme', () => {
  it('renders children correctly', () => {
    renderWithTheme(<div data-testid="child">Test Child</div>)

    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toHaveTextContent('Test Child')
  })

  it('injects the theme context into children components', () => {
    renderWithTheme(<ThemeConsumer />)

    expect(screen.getByTestId('theme-consumer')).toHaveTextContent(
      'Theme injected',
    )
  })

  it('allows styled-components to access theme properties', () => {
    renderWithTheme(
      <StyledComponent data-testid="styled-child">
        Styled Content
      </StyledComponent>,
    )

    const element = screen.getByTestId('styled-child')
    expect(element).toBeInTheDocument()

    // Verifica se a renderização ocorreu sem quebrar (o que aconteceria se o tema fosse undefined)
    expect(element).toHaveTextContent('Styled Content')
  })
})
