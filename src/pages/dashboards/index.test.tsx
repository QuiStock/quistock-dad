import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DashboardsPage from './index'

import type { ReactNode } from 'react'

// Mocking the imported components to avoid complex render errors
vi.mock('@/components/commom/Page', () => ({
  Page: ({ title, children }: { title: string; children: ReactNode }) => (
    <div data-testid="page" data-title={title}>
      {children}
    </div>
  ),
}))
vi.mock('@/components/dashboards/Dashboards', () => ({
  default: () => <div data-testid="dashboards" />,
}))

describe('DashboardsPage', () => {
  it('renders correctly', () => {
    const { container } = render(<DashboardsPage />)
    expect(container).toBeInTheDocument()
  })
})
