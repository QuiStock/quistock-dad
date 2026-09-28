import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Stores from './index'

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
vi.mock('@/partials/StoresPartial', () => ({
  StoresPartial: () => <div data-testid="stores-partial" />,
}))

describe('Stores', () => {
  it('renders correctly', () => {
    const { container } = render(<Stores />)
    expect(container).toBeInTheDocument()
  })
})
