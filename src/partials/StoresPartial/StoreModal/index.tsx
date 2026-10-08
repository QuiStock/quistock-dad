import { Modal } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'

import * as S from './styles'
import type { IStoreItem } from '../index'

const getStr = (val?: string | null) => val || ''

interface IStoreModal {
  open: boolean
  item?: IStoreItem | null
  onClose: () => void
}

export const StoreModal = ({ open, item, onClose }: IStoreModal) => {
  return (
    <Modal open={open} onClose={onClose} data-testid="modal-store">
      <S.BoxModal>
        <S.Title>Detalhes da loja</S.Title>

        <S.FormContainer>
          <TextInputComponent
            label="Nome"
            value={getStr(item?.name)}
            disabled
          />
          <TextInputComponent label="CEP" value={getStr(item?.cep)} disabled />
          <div style={{ display: 'flex', gap: '16px' }}>
            <TextInputComponent
              label="Estado"
              value={getStr(item?.state)}
              disabled
              style={{ flex: 1 }}
            />
            <TextInputComponent
              label="Cidade"
              value={getStr(item?.city)}
              disabled
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <TextInputComponent
              label="Rua"
              value={getStr(item?.street)}
              disabled
              style={{ flex: 2 }}
            />
            <TextInputComponent
              label="Número"
              value={getStr(item?.number)}
              disabled
              style={{ flex: 1 }}
            />
          </div>
          <TextInputComponent
            label="Complemento"
            value={getStr(item?.complement)}
            disabled
          />
        </S.FormContainer>

        <S.BoxButtons>
          <ButtonComponent variant="outlined" onClick={onClose}>
            Fechar
          </ButtonComponent>
        </S.BoxButtons>
      </S.BoxModal>
    </Modal>
  )
}
