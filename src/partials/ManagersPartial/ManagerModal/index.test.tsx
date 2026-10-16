import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { describe, expect, it, vi } from 'vitest'

import theme from '@/styles/theme'
import type { IManager } from '@/types'
import { ManagerModal } from '.'

vi.mock('@/hooks/useSendQuery', () => ({
  useSendQuery: () => ({
    responseBranches: [
      {
        id: '17',
        store_id: 17,
        name: 'Loja Centro',
        address: null,
        city: null,
        state: null,
        latitude: null,
        longitude: null,
      },
    ],
  }),
}))

const manager: IManager = {
  id: '1',
  name: 'Maria',
  email: 'maria@example.com',
  role: 'MANAGER',
  status: 'INACTIVE',
  profile_photo_url: null,
  store_id: 17,
  store_code: '001',
  store_name: 'Loja Centro',
  region_id: null,
  region_code: null,
  region_name: null,
}

const defaultProps = {
  open: true,
  onClose: vi.fn(),
  onSave: vi.fn(),
}

const renderModal = (
  props: Partial<React.ComponentProps<typeof ManagerModal>> = {},
) => (
  <ThemeProvider theme={theme}>
    <ManagerModal {...defaultProps} type="create" {...props} />
  </ThemeProvider>
)

describe('ManagerModal', () => {
  it('clears the creation form when reopened', () => {
    const { rerender } = render(renderModal())

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Novo gerente' },
    })
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'novo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Senha Inicial'), {
      target: { value: 'temporary-password' },
    })
    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Filial *' }))
    fireEvent.click(screen.getByRole('option', { name: 'Loja Centro' }))
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeEnabled()

    rerender(renderModal({ open: false }))
    rerender(renderModal())

    expect(screen.getByLabelText('Nome')).toHaveValue('')
    expect(screen.getByLabelText('E-mail')).toHaveValue('')
    expect(screen.getByLabelText('Senha Inicial')).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled()
  })

  it('initializes details and resets unsaved edits when reopened', () => {
    const props = { type: 'details', item: manager } as const
    const { rerender } = render(renderModal(props))

    expect(screen.getByLabelText('Nome')).toHaveValue(manager.name)
    expect(screen.getByLabelText('Nome')).toBeDisabled()
    expect(screen.getByLabelText('E-mail')).toHaveValue(manager.email)
    expect(screen.getByLabelText('Loja Vinculada')).toHaveValue(
      manager.store_name,
    )
    expect(screen.getByRole('combobox', { name: 'Status' })).toHaveTextContent(
      'Desativado',
    )

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Alterado' },
    })
    expect(screen.getByLabelText('Nome')).toBeEnabled()

    rerender(renderModal({ ...props, open: false }))
    rerender(renderModal(props))

    expect(screen.getByLabelText('Nome')).toHaveValue(manager.name)
    expect(screen.getByLabelText('Nome')).toBeDisabled()
  })

  it('resets the form when switching managers or modal type', () => {
    const { rerender } = render(renderModal({ type: 'edit', item: manager }))
    expect(screen.getByLabelText('Nome')).toBeEnabled()

    const otherManager = {
      ...manager,
      id: '2',
      name: 'Joao',
      email: 'joao@example.com',
    }
    rerender(renderModal({ type: 'edit', item: otherManager }))
    expect(screen.getByLabelText('Nome')).toHaveValue(otherManager.name)
    expect(screen.getByLabelText('E-mail')).toHaveValue(otherManager.email)

    rerender(renderModal({ type: 'create', item: otherManager }))
    expect(screen.getByLabelText('Nome')).toHaveValue('')
    expect(screen.getByLabelText('E-mail')).toHaveValue('')
    expect(screen.queryByLabelText('Loja Vinculada')).not.toBeInTheDocument()
  })

  it('saves edits with the existing status and without a password', () => {
    const onSave = vi.fn()
    render(renderModal({ type: 'edit', item: manager, onSave }))

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Nome atualizado' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))

    expect(onSave).toHaveBeenCalledWith({
      name: 'Nome atualizado',
      email: manager.email,
      status: manager.status,
      password: undefined,
      store_id: 17,
      replacement_manager_id: undefined,
    })
  })

  it('requires and submits a branch when creating a manager', () => {
    const onSave = vi.fn()
    render(renderModal({ onSave }))

    fireEvent.change(screen.getByLabelText('Nome'), {
      target: { value: 'Novo gerente' },
    })
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'novo@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Senha Inicial'), {
      target: { value: 'temporary-password' },
    })
    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled()

    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Filial *' }))
    fireEvent.click(screen.getByRole('option', { name: 'Loja Centro' }))
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }))

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ store_id: 17 }),
    )
  })

  it('requires an active replacement from the same branch when deactivating', () => {
    const onSave = vi.fn()
    const replacement = {
      ...manager,
      id: '2',
      name: 'Joao',
      status: 'ACTIVE' as const,
    }
    render(
      renderModal({
        type: 'edit',
        item: { ...manager, status: 'ACTIVE' },
        managers: [manager, replacement],
        onSave,
      }),
    )

    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Status' }))
    fireEvent.click(screen.getByRole('option', { name: 'Desativado' }))
    expect(
      screen.getByRole('combobox', { name: 'Gerente substituto *' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled()

    fireEvent.mouseDown(
      screen.getByRole('combobox', { name: 'Gerente substituto *' }),
    )
    fireEvent.click(screen.getByRole('option', { name: 'Joao' }))
    fireEvent.click(screen.getByRole('button', { name: 'Salvar' }))
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ replacement_manager_id: 2 }),
    )
  })
})
