import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { LoadingMask } from './index'

describe('LoadingMask', () => {
  it('renders correctly when isLoading is true', () => {
    render(<LoadingMask isLoading={true} />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('does not render when isLoading is false', () => {
    render(<LoadingMask isLoading={false} />)
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
  })
})
