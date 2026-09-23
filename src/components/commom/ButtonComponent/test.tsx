import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { ButtonComponent } from '.'

describe('<ButtonComponent />', () => {
  it('Should be render', () => {
    renderWithTheme(<ButtonComponent onClick={() => {}} />)

    expect(screen.getByTestId('button')).toBeInTheDocument()
  })
})
