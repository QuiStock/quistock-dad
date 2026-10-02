import { useState, useEffect } from 'react'
import { Modal, MenuItem } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'
import { mockStoresData } from '../../StoresPartial'
import type { IManagerItem } from '../index'

import * as S from './styles'

interface IManagerModal {
  open: boolean
  type: 'create' | 'edit' | 'details' | null
  item?: IManagerItem | null
  onClose: () => void
  onSave: (name: string, status?: string) => void
}

export const ManagerModal = ({
  open,
  type,
  item,
  onClose,
  onSave,
}: IManagerModal) => {
  const [isEditing, setIsEditing] = useState(
    type === 'create' || type === 'edit',
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [, setRole] = useState('')
  const [store, setStore] = useState('')

  useEffect(() => {
    if (open) {
      if (type === 'create') {
        setName('')
        setEmail('')
        setPassword('Quistock@123')
        setRole('Gerente')
        setStore('')
        setIsEditing(true)
      } else if (item) {
        setName(item.name || '')
        setEmail('email@example.com')
        setPassword('******')
        setRole('Gerente')
        setStore(item.store || '')
        setIsEditing(type === 'edit')
      }
    }
  }, [open, type, item])

  const handleSave = () => {
    onSave(name)
  }

  return (
    <Modal open={open} data-testid="modal-manager">
      <S.BoxModal>
        <S.Title>
          {type === 'create' ? 'Cadastrar novo gerente' : 'Detalhes do gerente'}
        </S.Title>
        {type === 'create' && (
          <S.Helper>Por favor, insira as informações do novo gerente.</S.Helper>
        )}

        <S.FormContainer>
          <TextInputComponent
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
          <TextInputComponent
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
          />
          <TextInputComponent
            label="Senha Gerada"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={!isEditing}
          />

          <TextInputComponent
            select
            fullWidth
            label="Loja"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            disabled={!isEditing}
            sx={{ '& .MuiInputLabel-root': { fontSize: '1.6rem' } }}
          >
            <MenuItem value="" disabled sx={{ fontSize: '1.6rem' }}>
              Selecionar loja
            </MenuItem>
            {mockStoresData.map((s) => (
              <MenuItem key={s.id} sx={{ fontSize: '1.6rem' }} value={s.name}>
                {s.name}
              </MenuItem>
            ))}
          </TextInputComponent>
        </S.FormContainer>

        <S.BoxButtons>
          {isEditing ? (
            <>
              <ButtonComponent variant="outlined" onClick={onClose}>
                Cancelar
              </ButtonComponent>
              <ButtonComponent
                variant="contained"
                onClick={handleSave}
                disabled={!name}
              >
                {type === 'create' ? 'Cadastrar' : 'Salvar'}
              </ButtonComponent>
            </>
          ) : (
            <>
              <ButtonComponent variant="outlined" onClick={onClose}>
                Fechar
              </ButtonComponent>
              <ButtonComponent
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </ButtonComponent>
            </>
          )}
        </S.BoxButtons>
      </S.BoxModal>
    </Modal>
  )
}
