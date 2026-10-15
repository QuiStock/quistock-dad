import { useState } from 'react'
import { Modal, MenuItem } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'
import { useSendQuery } from '@/hooks/useSendQuery'
import { getBranches, BRANCHES_QUERY_KEY } from '@/services/api-branches'
import { ManagerStatusEnum } from '@/types/enums'
import type { IBranch, IManager, TAccountStatus } from '@/types'

import * as S from './styles'

type TModalType = 'create' | 'edit' | 'details' | null

export interface ISaveManagerData {
  name: string
  email: string
  password?: string
  status?: TAccountStatus
}

interface IManagerModal {
  open: boolean
  type: TModalType
  item?: IManager | null
  onClose: () => void
  onSave: (data: ISaveManagerData) => void
}

interface IFormFieldsProps {
  type: TModalType
  isEditing: boolean
  name: string
  setName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  password: string
  setPassword: (v: string) => void
  status: TAccountStatus
  setStatus: (v: TAccountStatus) => void
  store: string
  setStore: (v: string) => void
  branches: IBranch[] | null
}

const FormFields = ({
  type,
  isEditing,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  status,
  setStatus,
  store,
  setStore,
  branches,
}: IFormFieldsProps) => {
  return (
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
      {type === 'create' ? (
        <TextInputComponent
          label="Senha Inicial"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={!isEditing}
        />
      ) : (
        <TextInputComponent
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TAccountStatus)}
          disabled={!isEditing}
          sx={{ '& .MuiInputLabel-root': { fontSize: '1.6rem' } }}
        >
          <MenuItem value="ACTIVE" sx={{ fontSize: '1.6rem' }}>
            {ManagerStatusEnum.ACTIVE}
          </MenuItem>
          <MenuItem value="INACTIVE" sx={{ fontSize: '1.6rem' }}>
            {ManagerStatusEnum.INACTIVE}
          </MenuItem>
        </TextInputComponent>
      )}

      {store && (
        <TextInputComponent label="Loja Vinculada" value={store} disabled />
      )}

      {type === 'create' && branches && branches.length > 0 && (
        <TextInputComponent
          select
          fullWidth
          label="Loja de Atuação (Opcional)"
          value={store}
          onChange={(e) => setStore(e.target.value)}
          disabled={!isEditing}
          sx={{ '& .MuiInputLabel-root': { fontSize: '1.6rem' } }}
        >
          <MenuItem value="" sx={{ fontSize: '1.6rem' }}>
            Nenhuma loja selecionada
          </MenuItem>
          {branches.map((b) => (
            <MenuItem key={b.id} sx={{ fontSize: '1.6rem' }} value={b.name}>
              {b.name}
            </MenuItem>
          ))}
        </TextInputComponent>
      )}
    </S.FormContainer>
  )
}

interface IActionButtonsProps {
  isEditing: boolean
  isFormValid: boolean
  type: TModalType
  onClose: () => void
  onSave: () => void
  onStartEditing: () => void
}

const ActionButtons = ({
  isEditing,
  isFormValid,
  type,
  onClose,
  onSave,
  onStartEditing,
}: IActionButtonsProps) => {
  if (isEditing) {
    const saveLabel = type === 'create' ? 'Cadastrar' : 'Salvar'
    return (
      <S.BoxButtons>
        <ButtonComponent variant="outlined" onClick={onClose}>
          Cancelar
        </ButtonComponent>
        <ButtonComponent
          variant="contained"
          onClick={onSave}
          disabled={!isFormValid}
        >
          {saveLabel}
        </ButtonComponent>
      </S.BoxButtons>
    )
  }

  return (
    <S.BoxButtons>
      <ButtonComponent variant="outlined" onClick={onClose}>
        Fechar
      </ButtonComponent>
      <ButtonComponent variant="contained" onClick={onStartEditing}>
        Editar
      </ButtonComponent>
    </S.BoxButtons>
  )
}

export const ManagerModal = (props: IManagerModal) =>
  props.open ? (
    <ManagerModalContent
      key={`${props.type}:${props.item?.id ?? ''}`}
      {...props}
    />
  ) : null

const getInitialFormValues = (
  type: TModalType,
  item?: IManager | null,
): { name: string; email: string; status: TAccountStatus; store: string } => {
  if (type === 'create' || !item) {
    return { name: '', email: '', status: 'ACTIVE', store: '' }
  }

  return {
    name: item.name || '',
    email: item.email || '',
    status: item.status || 'ACTIVE',
    store: item.store_name || '',
  }
}

const ManagerModalContent = ({
  open,
  type,
  item,
  onClose,
  onSave,
}: IManagerModal) => {
  const isCreating = type === 'create'
  const initialValues = getInitialFormValues(type, item)
  const [isEditing, setIsEditing] = useState(isCreating || type === 'edit')
  const [name, setName] = useState(initialValues.name)
  const [email, setEmail] = useState(initialValues.email)
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(initialValues.status)
  const [store, setStore] = useState(initialValues.store)

  const { responseBranches: branches } = useSendQuery<IBranch[], 'Branches'>({
    queryKey: BRANCHES_QUERY_KEY,
    apiPromise: getBranches,
    suffix: 'Branches',
  })

  const handleSave = () => {
    onSave({
      name,
      email,
      password: type === 'create' ? password : undefined,
      status,
    })
  }

  const hasName = name.trim().length > 0
  const hasEmail = email.trim().length > 0
  const hasPassword = type !== 'create' || password.trim().length > 0
  const isFormValid = hasName && hasEmail && hasPassword

  const title =
    type === 'create' ? 'Cadastrar novo gerente' : 'Detalhes do gerente'

  return (
    <Modal open={open} onClose={onClose} data-testid="modal-manager">
      <S.BoxModal>
        <S.Title>{title}</S.Title>
        {type === 'create' && (
          <S.Helper>Por favor, insira as informações do novo gerente.</S.Helper>
        )}

        <FormFields
          type={type}
          isEditing={isEditing}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          status={status}
          setStatus={setStatus}
          store={store}
          setStore={setStore}
          branches={branches}
        />

        <ActionButtons
          isEditing={isEditing}
          isFormValid={isFormValid}
          type={type}
          onClose={onClose}
          onSave={handleSave}
          onStartEditing={() => setIsEditing(true)}
        />
      </S.BoxModal>
    </Modal>
  )
}
