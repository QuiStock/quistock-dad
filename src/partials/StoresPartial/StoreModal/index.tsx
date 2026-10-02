import { useState, useEffect } from 'react'
import { Modal } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'

import * as S from './styles'

interface IStoreModal {
  open: boolean
  type: 'create' | 'edit' | 'details' | null
  item?: any // using any for now, or define IStoreItem
  onClose: () => void
  onSave: (data: any) => void
}

export const StoreModal = ({
  open,
  type,
  item,
  onClose,
  onSave,
}: IStoreModal) => {
  const [isEditing, setIsEditing] = useState(
    type === 'create' || type === 'edit',
  )

  const [name, setName] = useState('')
  const [cep, setCep] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [complement, setComplement] = useState('')

  useEffect(() => {
    if (open) {
      if (type === 'create') {
        setName('')
        setCep('')
        setState('')
        setCity('')
        setStreet('')
        setNumber('')
        setComplement('')
        setIsEditing(true)
      } else if (item) {
        setName(item.name || '')
        setCep(item.cep || '')
        setState(item.state || '')
        setCity(item.city || '')
        setStreet(item.street || '')
        setNumber(item.number || '')
        setComplement(item.complement || '')
        setIsEditing(type === 'edit')
      }
    }
  }, [open, type, item])

  const handleSave = () => {
    onSave({ name, cep, state, city, street, number, complement })
  }

  return (
    <Modal open={open} data-testid="modal-store">
      <S.BoxModal>
        <S.Title>
          {type === 'create' ? 'Cadastrar nova loja' : 'Detalhes da loja'}
        </S.Title>
        {type === 'create' && (
          <S.Helper>Por favor, insira as informações da nova loja.</S.Helper>
        )}

        <S.FormContainer>
          <TextInputComponent
            label="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
          />
          <TextInputComponent
            label="CEP"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            disabled={!isEditing}
          />
          <div style={{ display: 'flex', gap: '16px' }}>
            <TextInputComponent
              label="Estado"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={!isEditing}
              style={{ flex: 1 }}
            />
            <TextInputComponent
              label="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEditing}
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <TextInputComponent
              label="Rua"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              disabled={!isEditing}
              style={{ flex: 2 }}
            />
            <TextInputComponent
              label="Número"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              disabled={!isEditing}
              style={{ flex: 1 }}
            />
          </div>
          <TextInputComponent
            label="Complemento"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            disabled={!isEditing}
          />
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
