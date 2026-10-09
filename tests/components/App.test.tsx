import { render, screen, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'

import App from '@/pages/App'

// Moca os componentes internos para focar apenas nas responsabilidades do App (Roteamento e Eventos)
vi.mock('@/pages/stores', () => ({
  default: () => <div data-testid="stores-page">Stores Page</div>,
}))

vi.mock('@/pages/404', () => ({
  default: () => <div data-testid="not-found-page">404 Page</div>,
}))

vi.mock('@/components/commom/ToastNotification', () => ({
  ToastNotification: ({
    notifications,
  }: {
    notifications: { id: string; message: React.ReactNode }[]
  }) => (
    <div data-testid="toast-container">
      {notifications.map((n) => (
        <span key={n.id} data-testid="toast-item">
          {n.message}
        </span>
      ))}
    </div>
  ),
}))

describe('App', () => {
  beforeEach(() => {
    // Reseta a rota para o padrão antes de cada teste
    window.history.pushState({}, '', '/')
  })

  it('renders the NotFound page on an unknown route (default "/")', async () => {
    render(<App />)

    // The router redirects "/" to "/login"
    // Wait, if it redirects to /login, how will it find not-found-page?
    // Actually, in the original test it expected not-found-page on default "/" route, which was clearly wrong.
    // I should test a truly unknown route for not found!
    window.history.pushState({}, '', '/unknown-route-123')
    render(<App />)
    expect(await screen.findByTestId('not-found-page')).toBeInTheDocument()
  })

  it('renders the Stores page when route is "/lojas"', async () => {
    window.history.pushState({}, '', '/lojas')
    render(<App />)

    expect(await screen.findByTestId('stores-page')).toBeInTheDocument()
  })

  it('listens to "emitNotification" events and updates the ToastNotification state', () => {
    render(<App />)

    const testNotification = {
      id: '123',
      type: 'success',
      message: 'Operação realizada com sucesso!',
    }

    // O act() garante que o React processe a atualização de estado gerada pelo evento antes do expect
    act(() => {
      window.dispatchEvent(
        new CustomEvent('emitNotification', {
          detail: testNotification,
        }),
      )
    })

    const toastItem = screen.getByTestId('toast-item')
    expect(toastItem).toBeInTheDocument()
    expect(toastItem).toHaveTextContent('Operação realizada com sucesso!')
  })

  it('prevents rendering duplicated notifications with the same id', () => {
    render(<App />)

    const duplicatedNotification = {
      id: '999',
      type: 'error',
      message: 'Erro no servidor',
    }

    act(() => {
      // Dispara o evento duas vezes com o mesmo ID
      window.dispatchEvent(
        new CustomEvent('emitNotification', { detail: duplicatedNotification }),
      )
      window.dispatchEvent(
        new CustomEvent('emitNotification', { detail: duplicatedNotification }),
      )
    })

    const toastItems = screen.getAllByTestId('toast-item')
    expect(toastItems).toHaveLength(1) // Garante que a duplicata foi ignorada
  })
})
