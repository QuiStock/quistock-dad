import { type ReactNode, useId, useState } from 'react'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import {
  DialogActions,
  DialogDescription,
  DialogModal,
  DialogTitle,
} from '@/components/commom/DialogModal'
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
  const baseId = useId()
  const titleId = `${baseId}-title`
  const helperId = `${baseId}-helper`

  return (
    <DialogModal
      open={open}
      data-testid="modal-create-and-edit-title"
      labelledBy={titleId}
      describedBy={helper ? helperId : undefined}
    >
      <DialogTitle id={titleId}>{modalTitle}</DialogTitle>

      <TextInputComponent
        id={`${baseId}-input`}
        label={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && validateContent(value)) onSave(value)
        }}
      />

      {!!helper && (
        <DialogDescription id={helperId}>{helper}</DialogDescription>
      )}

      <DialogActions>
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
      </DialogActions>
    </DialogModal>
  )
}

export { ModalCreateAndEditTitle }
