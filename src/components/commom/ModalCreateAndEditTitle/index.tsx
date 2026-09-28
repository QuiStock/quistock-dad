import * as S from './styles'
import { type ReactNode, useState } from 'react'

import { Modal } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'

interface IModalCreateAndEditTitle {
  open: boolean
  modalTitle: string
  placeholder: string
  initialValue?: string
  helper?: ReactNode
  validateContent?: (value: string) => boolean
  onCancel: () => void
  onSave: (value: string) => void
}

const ModalCreateAndEditTitle = ({
  open,
  modalTitle,
  placeholder,
  initialValue,
  helper,
  validateContent = () => true,
  onCancel,
  onSave,
}: IModalCreateAndEditTitle) => {
  const [value, setValue] = useState(initialValue || '')

  return (
    <Modal open={open} data-testid="modal-create-and-edit-title">
      <S.BoxModal>
        <S.Title>{modalTitle}</S.Title>

        <TextInputComponent
          label={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && validateContent(value)) onSave(value)
          }}
        />

        <S.Helper>{helper}</S.Helper>

        <S.BoxButtons>
          <ButtonComponent
            variant="outlined"
            data-testid="cancel"
            onClick={onCancel}
          >
            {'Cancelar'}
          </ButtonComponent>
          <ButtonComponent
            variant="contained"
            data-testid="save"
            onClick={() => onSave(value)}
            disabled={!validateContent(value)}
          >
            {'Salvar'}
          </ButtonComponent>
        </S.BoxButtons>
      </S.BoxModal>
    </Modal>
  )
}

export { ModalCreateAndEditTitle }
