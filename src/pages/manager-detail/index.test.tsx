import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import ManagerDetail from './index'

import type { ReactNode } from 'react'

vi.mock('@/components/commom/Page', () => ({
  Page: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))
vi.mock('@/components/commom/LoadingMask', () => ({
  LoadingMask: () => <div data-testid="loading" />,
}))
vi.mock('@/components/commom/ButtonWithIcon', () => ({
  ButtonWithIcon: ({ children }: { children: ReactNode }) => (
    <button>{children}</button>
  ),
}))
vi.mock('@/hooks/useSendQuery', () => ({
  useSendQuery: () => ({
    responseManager: {
      id: '7',
      name: 'Maria',
      email: 'maria@x.com',
      status: 'ACTIVE',
      store_name: 'Loja 1',
      region_name: null,
    },
    isLoadingManager: false,
    errorManager: null,
  }),
}))

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/gerentes/:id" element={<ManagerDetail />} />
          <Route path="/sem-id" element={<ManagerDetail />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )

describe('ManagerDetail', () => {
  it('shows manager data when id is present', () => {
    renderAt('/gerentes/7')
    expect(screen.getByText('Maria')).toBeInTheDocument()
  })

  it('shows an alert when id is missing', () => {
    renderAt('/sem-id')
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
