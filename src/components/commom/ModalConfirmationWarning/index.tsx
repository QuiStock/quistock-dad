import { useId, useState } from 'react'
import * as S from './styles'

import { Checkbox } from '@mui/material'

import { ButtonComponent } from '../ButtonComponent'
import {
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogModal,
  DialogTitle,
} from '../DialogModal'

interface IModalConfirmationWarning {
  openModal: boolean
  isImportant?: boolean
  isAlert?: boolean
  message: string | string[]
  onConfirm?: () => void
  onCancel?: () => void
}

const ModalConfirmationWarning = ({
  openModal,
  isImportant = false,
  isAlert = false,
  message,
  onConfirm,
  onCancel,
}: IModalConfirmationWarning) => {
  const [secondValidation, setSecondValidation] = useState(false)
  const dialogId = useId()
  const titleId = `${dialogId}-title`
  const checkboxId = `${dialogId}-checkbox`

  const getModalTitle = () => {
    if (isImportant) return 'Aviso importante'
    if (isAlert) return 'Alerta!'
    return 'Confirmação'
  }
  const messageItems =
    typeof message === 'string'
      ? [
          {
            id: `${dialogId}-message`,
            key: `${dialogId}-message`,
            text: message,
          },
        ]
      : (() => {
          const duplicateCounts = new Map<string, number>()
          return message.map((text) => {
            const occurrence = duplicateCounts.get(text) ?? 0
            duplicateCounts.set(text, occurrence + 1)
            const key = `${text}:${occurrence}`
            return { id: `${dialogId}-${occurrence}`, key, text }
          })
        })()
  const messageIds = messageItems.map(({ id }) => id).join(' ')

  return (
    <DialogModal
      open={openModal}
      role={isAlert ? 'alertdialog' : 'dialog'}
      labelledBy={titleId}
      describedBy={messageIds}
    >
      <DialogTitle id={titleId} $tone={isAlert ? 'danger' : 'default'}>
        {getModalTitle()}
      </DialogTitle>

      <DialogBody>
        {messageItems.map(({ id, key, text }) => (
          <DialogDescription id={id} key={key}>
            {text}
          </DialogDescription>
        ))}
      </DialogBody>

      {isImportant && (
        <S.ConfirmationBox htmlFor={checkboxId}>
          <Checkbox
            id={checkboxId}
            checked={secondValidation}
            onChange={(e) => setSecondValidation(e.target.checked)}
            sx={{ '& .MuiSvgIcon-root': { fontSize: '2.4rem', margin: 0 } }}
          />
          <S.ConfirmationText>{'Aceitar e confirmar'}</S.ConfirmationText>
        </S.ConfirmationBox>
      )}

      <DialogActions>
        <ButtonComponent
          variant="outlined"
          onClick={() => onCancel && onCancel()}
        >
          {'Cancelar'}
        </ButtonComponent>
        <ButtonComponent
          variant="contained"
          onClick={() => onConfirm && onConfirm()}
          disabled={isImportant && !secondValidation}
        >
          {'Confirmar'}
        </ButtonComponent>
      </DialogActions>
    </DialogModal>
  )
}

export { ModalConfirmationWarning }
