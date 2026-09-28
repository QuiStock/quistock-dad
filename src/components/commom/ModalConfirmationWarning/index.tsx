import { useState } from 'react'
import * as S from './styles'

import { Checkbox } from '@mui/material'

import { ButtonComponent } from '../ButtonComponent'

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

  return (
    <S.StyledModal open={openModal}>
      <S.Wrapper>
        <S.ModalTitle color={isAlert ? 'red' : 'main'}>
          {isImportant
            ? 'Aviso importante'
            : isAlert
              ? 'Alerta!'
              : 'Confirmação'}
        </S.ModalTitle>

        {typeof message === 'string' ? (
          <S.ModalContent>{message}</S.ModalContent>
        ) : (
          message.map((string, index) => (
            <S.ModalContent key={index}>{string}</S.ModalContent>
          ))
        )}

        {isImportant && (
          <S.ConfirmationBox htmlFor="confirmation-checkbox">
            <Checkbox
              id="confirmation-checkbox"
              checked={secondValidation}
              onChange={(e) => setSecondValidation(e.target.checked)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: '2.5rem', margin: 0 } }}
            />
            <S.ModalContent>{'Aceitar e confirmar'}</S.ModalContent>
          </S.ConfirmationBox>
        )}

        <S.ButtonContainer>
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
        </S.ButtonContainer>
      </S.Wrapper>
    </S.StyledModal>
  )
}

export { ModalConfirmationWarning }
