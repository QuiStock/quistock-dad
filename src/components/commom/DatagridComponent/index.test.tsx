import { renderWithTheme } from '@/utils/__tests__/helpers'
import { describe, it, expect } from 'vitest'
import { DatagridComponent } from './index'

describe('DatagridComponent', () => {
  it('renders correctly', () => {
    const { container } = renderWithTheme(
      <DatagridComponent rows={[]} columns={[]} />,
    )
    expect(container).toBeInTheDocument()
  })
})
