import { Modal } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'

import * as S from './styles'
import type { IStoreItem } from '@/types'

const getStr = (val?: string | number | null) =>
  val !== undefined && val !== null ? String(val) : '-'

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
            label="Nome da Filial"
            value={getStr(item?.name)}
            disabled
          />
          <TextInputComponent
            label="Código ERP / ID"
            value={getStr(item?.id)}
            disabled
          />
          <S.Row>
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
          </S.Row>
          <TextInputComponent
            label="Endereço"
            value={getStr(item?.address || item?.street)}
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
