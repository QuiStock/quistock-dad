import { useState } from 'react'
import { Modal, MenuItem } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'
import { ManagerStatusEnum } from '@/types/enums'
import type { IManagerItem } from '../index'

import * as S from './styles'

interface IManagerModal {
  open: boolean
  type: 'create' | 'edit' | null
  item?: IManagerItem | null
  onClose: () => void
  onSave: (name: string, status: string) => void
}

function useModalState(item: IManagerItem | null | undefined, open: boolean) {
  const defaultName = item ? item.name : ''
  const defaultStatus =
    item && item.status ? item.status : ManagerStatusEnum.ACTIVE

  const [name, setName] = useState(defaultName)
  const [status, setStatus] = useState(defaultStatus)

  const [prevOpen, setPrevOpen] = useState(open)
  const [prevItem, setPrevItem] = useState(item)

  if (open !== prevOpen || item !== prevItem) {
    setPrevOpen(open)
    setPrevItem(item)
    if (open) {
      setName(defaultName)
      setStatus(defaultStatus)
    }
  }

  return { name, setName, status, setStatus }
}

export const ManagerModal = ({
  open,
  type,
  item,
  onClose,
  onSave,
}: IManagerModal) => {
  const { name, setName, status, setStatus } = useModalState(item, open)

  return (
    <Modal open={open} data-testid="modal-manager">
      <S.BoxModal>
        <S.Title>
          {type === 'edit' ? 'Editar gerente' : 'Adicionar gerente'}
        </S.Title>

        <S.FormContainer>
          <TextInputComponent
            label="Nome do gerente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextInputComponent
            select
            fullWidth
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ '& .MuiInputLabel-root': { fontSize: '1.6rem' } }}
          >
            <MenuItem
              sx={{ fontSize: '1.6rem' }}
              value={ManagerStatusEnum.ACTIVE}
            >
              Ativo
            </MenuItem>
            <MenuItem
              sx={{ fontSize: '1.6rem' }}
              value={ManagerStatusEnum.INACTIVE}
            >
              Desativado
            </MenuItem>
          </TextInputComponent>
        </S.FormContainer>

        <S.BoxButtons>
          <ButtonComponent variant="outlined" onClick={onClose}>
            {'Cancelar'}
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            onClick={() => onSave(name, status)}
            disabled={!name}
          >
            {'Salvar'}
          </ButtonComponent>
        </S.BoxButtons>
      </S.BoxModal>
    </Modal>
  )
}
