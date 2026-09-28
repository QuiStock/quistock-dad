import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './index'

import type { ReactNode } from 'react'

vi.mock('@/components/commom/Page', () => ({
  Page: ({ title, children }: { title: string; children: ReactNode }) => (
    <div data-testid="page" data-title={title}>
      {children}
    </div>
  ),
}))
vi.mock('@/partials/StoresPartial', () => ({
  StoresPartial: () => <div data-testid="stores-partial" />,
}))
vi.mock('@/components/home/ReducedDashboard', () => ({
  default: () => <div data-testid="reduced-dashboard" />,
}))

describe('Home', () => {
  it('renders correctly', () => {
    const { container } = render(<Home />)
    expect(container).toBeInTheDocument()
  })
})
