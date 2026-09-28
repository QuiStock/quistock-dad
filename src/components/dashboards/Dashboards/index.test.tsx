import { renderWithTheme } from '@/utils/__tests__/helpers'
import { describe, it, expect } from 'vitest'
import Dashboards from './index'

describe('Dashboards', () => {
  it('renders correctly', () => {
    const { container } = renderWithTheme(<Dashboards />)
    expect(container).toBeInTheDocument()
  })
})
