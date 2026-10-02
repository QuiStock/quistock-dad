import { useState } from 'react'
import { Modal } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'

import * as S from './styles'
import type { IStoreItem } from '../index'

const getStr = (val?: string | null) => val || ''

interface IStoreModal {
  open: boolean
  type: 'create' | 'edit' | 'details' | null
  item?: IStoreItem | null
  onClose: () => void
  onSave: (data: IStoreItem) => void
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

  const [prevOpen, setPrevOpen] = useState(open)
  const [prevItem, setPrevItem] = useState(item)
  const [prevType, setPrevType] = useState(type)

  const syncState = () => {
    if (open === prevOpen && item === prevItem && type === prevType) return
    setPrevOpen(open)
    setPrevItem(item)
    setPrevType(type)

    if (!open) return

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
      setName(getStr(item.name))
      setCep(getStr(item.cep))
      setState(getStr(item.state))
      setCity(getStr(item.city))
      setStreet(getStr(item.street))
      setNumber(getStr(item.number))
      setComplement(getStr(item.complement))
      setIsEditing(type === 'edit')
    }
  }
  syncState()

  const handleSave = () => {
    onSave({
      id: item?.id || 0,
      name,
      cep,
      state,
      city,
      street,
      number,
      complement,
    })
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
