import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ThemeProvider } from 'styled-components'
import theme from '@/styles/theme'
import StoreDetail from './index'

import type { ReactNode } from 'react'
import type { TUserRole } from '@/types'

const mocks = vi.hoisted(() => {
  const state: { role: TUserRole; isLoadingBranches: boolean } = {
    role: 'ADMIN',
    isLoadingBranches: false,
  }
  return state
})

vi.mock('@/components/commom/Page', () => ({
  Page: ({ children }: { children: ReactNode }) => <div>{children}</div>,
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
vi.mock('@/hooks/useBranches', () => ({
  useBranches: () => ({
    branches: [
      {
        id: 'FIL504',
        store_id: 504,
        name: 'Filial Centro',
        address: null,
        city: 'Campinas',
        state: 'SP',
        latitude: null,
        longitude: null,
      },
    ],
    isLoadingBranches: mocks.isLoadingBranches,
  }),
}))
vi.mock('@/hooks/useProfile', () => ({
  useProfile: () => ({ profile: { role: mocks.role } }),
}))
vi.mock('@/hooks/useSendQuery', () => ({
  useSendQuery: () => ({
    responseStoreSummary: {
      total_products: 12,
      high_risk_products: 0,
      medium_risk_products: 0,
      low_risk_products: 0,
      suggested_actions: 0,
      suggested_promotions: 3,
      suggested_stock_orders: 0,
      near_expiry_products: 4,
      stockout_products: 1,
      overstock_products: 2,
      active_actions: 5,
    },
    isLoadingStoreSummary: false,
    responseStoreManagers: [
      {
        id: '7',
        name: 'Maria',
        email: 'maria@x.com',
        status: 'ACTIVE',
      },
    ],
    isLoadingStoreManagers: false,
  }),
}))

const renderAt = (path: string) =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/lojas/:id" element={<StoreDetail />} />
          <Route path="/gerentes/:id" element={<p>Página do gerente</p>} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>,
  )

describe('StoreDetail', () => {
  beforeEach(() => {
    mocks.role = 'ADMIN'
    mocks.isLoadingBranches = false
  })

  it('shows store data, metrics and managers for the store_id slug', () => {
    renderAt('/lojas/504')
    expect(
      screen.getByRole('heading', { level: 1, name: 'Filial Centro' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Campinas - SP')).toBeInTheDocument()
    expect(screen.getByText('Não informado')).toBeInTheDocument()
    expect(screen.getByText('Produtos analisados')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('Maria')).toBeInTheDocument()
  })

  it('navigates to the manager page', () => {
    renderAt('/lojas/504')
    fireEvent.click(screen.getByRole('button', { name: 'Ver gerente' }))
    expect(screen.getByText('Página do gerente')).toBeInTheDocument()
  })

  it('hides managers for roles without manager access', () => {
    mocks.role = 'MANAGER'
    renderAt('/lojas/504')
    expect(
      screen.queryByRole('heading', { name: 'Gerentes' }),
    ).not.toBeInTheDocument()
  })

  it('shows an alert for an unknown store', () => {
    renderAt('/lojas/999')
    expect(screen.getByRole('alert')).toHaveTextContent('Loja não encontrada.')
  })

  it('shows an alert for an invalid slug', () => {
    renderAt('/lojas/abc')
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Identificador da loja inválido.',
    )
  })
})
