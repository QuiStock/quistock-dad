import { fireEvent, render, screen } from '@testing-library/react'
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
  ButtonWithIcon: ({
    children,
    onClick,
  }: {
    children: ReactNode
    onClick?: () => void
  }) => <button onClick={onClick}>{children}</button>,
}))
vi.mock('@/hooks/useManagers', () => ({
  useManagers: () => ({
    managers: [],
    isSavingManager: false,
    saveManager: vi.fn(),
  }),
}))
vi.mock('@/partials/ManagersPartial/ManagerModal', () => ({
  ManagerModal: ({ open, type }: { open: boolean; type: string }) =>
    open ? <div data-testid="manager-modal">{type}</div> : null,
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
    expect(
      screen.getByRole('heading', { level: 1, name: 'Maria' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Não vinculada')).toBeInTheDocument()
  })

  it('opens the edit modal when clicking Editar', () => {
    renderAt('/gerentes/7')
    expect(screen.queryByTestId('manager-modal')).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    expect(screen.getByTestId('manager-modal')).toHaveTextContent('edit')
  })

  it('shows an alert when id is missing', () => {
    renderAt('/sem-id')
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Editar' }),
    ).not.toBeInTheDocument()
  })
})
