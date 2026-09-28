import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Managers from './index'

import type { ReactNode } from 'react'

vi.mock('@/components/commom/Page', () => ({
  Page: ({ title, children }: { title: string; children: ReactNode }) => (
    <div data-testid="page" data-title={title}>
      {children}
    </div>
  ),
}))
vi.mock('@/components/commom/TabsCompoundComponent', () => ({
  TabsCompoundComponent: {
    Root: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    List: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    Tab: () => <div />,
    Panel: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  },
}))
vi.mock('@/partials/ManagersPartial', () => ({
  ManagersPartial: () => <div data-testid="managers-partial" />,
}))

describe('Managers', () => {
  it('renders correctly', () => {
    const { container } = render(<Managers />)
    expect(container).toBeInTheDocument()
  })
})
