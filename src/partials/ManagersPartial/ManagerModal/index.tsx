import { useMemo, useState } from 'react'
import { Modal, MenuItem } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'
import { useSendQuery } from '@/hooks/useSendQuery'
import { getBranches, BRANCHES_QUERY_KEY } from '@/services/api-branches'
import { ManagerStatusEnum } from '@/types/enums'
import type { IBranch, IManager, TAccountStatus } from '@/types'

import * as S from './styles'

type TModalType = 'create' | 'edit' | 'details' | null
type TStoreSelection = number | ''

export interface ISaveManagerData {
  name: string
  email: string
  password?: string
  status?: TAccountStatus
  store_id: number
  replacement_manager_id?: number
}

interface IManagerModal {
  open: boolean
  type: TModalType
  item?: IManager | null
  managers?: IManager[]
  isSaving?: boolean
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
  storeId: TStoreSelection
  setStoreId: (v: TStoreSelection) => void
  replacementManagerId: TStoreSelection
  setReplacementManagerId: (v: TStoreSelection) => void
  replacementManagers: IManager[]
  branches: IBranch[]
  storeName: string
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
  storeId,
  setStoreId,
  replacementManagerId,
  setReplacementManagerId,
  replacementManagers,
  branches,
  storeName,
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

      {isEditing ? (
        <TextInputComponent
          select
          fullWidth
          required
          label="Filial *"
          value={storeId}
          onChange={(e) => {
            const value = e.target.value
            setStoreId(value === '' ? '' : Number(value))
            setReplacementManagerId('')
          }}
          disabled={!isEditing}
          sx={{ '& .MuiInputLabel-root': { fontSize: '1.6rem' } }}
        >
          <MenuItem value="" sx={{ fontSize: '1.6rem' }}>
            Selecione uma filial
          </MenuItem>
          {branches.map((branch) => (
            <MenuItem
              key={branch.store_id}
              sx={{ fontSize: '1.6rem' }}
              value={branch.store_id}
            >
              {branch.name}
            </MenuItem>
          ))}
        </TextInputComponent>
      ) : (
        <TextInputComponent
          label="Loja Vinculada"
          value={
            branches.find((branch) => branch.store_id === storeId)?.name ??
            storeName
          }
          disabled
        />
      )}

      {replacementManagers.length > 0 && (
        <TextInputComponent
          select
          fullWidth
          required
          label="Gerente substituto *"
          value={replacementManagerId}
          onChange={(e) => {
            const value = e.target.value
            setReplacementManagerId(value === '' ? '' : Number(value))
          }}
          disabled={!isEditing}
          sx={{ '& .MuiInputLabel-root': { fontSize: '1.6rem' } }}
        >
          <MenuItem value="" sx={{ fontSize: '1.6rem' }}>
            Selecione um gerente
          </MenuItem>
          {replacementManagers.map((manager) => (
            <MenuItem
              key={manager.id}
              sx={{ fontSize: '1.6rem' }}
              value={Number(manager.id)}
            >
              {manager.name}
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
  isSaving: boolean
  type: TModalType
  onClose: () => void
  onSave: () => void
  onStartEditing: () => void
}

const ActionButtons = ({
  isEditing,
  isFormValid,
  isSaving,
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
          disabled={!isFormValid || isSaving}
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
): {
  name: string
  email: string
  status: TAccountStatus
  storeId: TStoreSelection
} => {
  if (type === 'create' || !item) {
    return { name: '', email: '', status: 'ACTIVE', storeId: '' }
  }

  return {
    name: item.name || '',
    email: item.email || '',
    status: item.status || 'ACTIVE',
    storeId: item.store_id ?? '',
  }
}

const getReplacementManagers = (
  managers: IManager[],
  itemId: IManager['id'] | undefined,
  storeId: TStoreSelection,
  isDeactivating: boolean,
) => {
  if (!isDeactivating || storeId === '') return []

  return managers.filter(
    (manager) =>
      manager.id !== itemId &&
      manager.status === 'ACTIVE' &&
      manager.store_id === storeId,
  )
}

const getManagerSaveData = (
  type: TModalType,
  name: string,
  email: string,
  password: string,
  status: TAccountStatus,
  storeId: number,
  isDeactivating: boolean,
  replacementManagerId: TStoreSelection,
): ISaveManagerData => ({
  name,
  email,
  password: type === 'create' ? password : undefined,
  status,
  store_id: storeId,
  replacement_manager_id:
    isDeactivating && replacementManagerId !== ''
      ? replacementManagerId
      : undefined,
})

const isManagerFormValid = (conditions: boolean[]) => conditions.every(Boolean)

const isManagerDeactivating = (
  item: IManager | null | undefined,
  status: TAccountStatus,
  isEditing: boolean,
) => item?.status === 'ACTIVE' && status === 'INACTIVE' && isEditing

const getInitialEditingState = (type: TModalType) =>
  type === 'create' || type === 'edit'

const getModalTitle = (type: TModalType) =>
  type === 'create' ? 'Cadastrar novo gerente' : 'Detalhes do gerente'

const ManagerModalHelper = ({ type }: { type: TModalType }) =>
  type === 'create' ? (
    <S.Helper>Por favor, insira as informações do novo gerente.</S.Helper>
  ) : null

const ManagerModalContent = ({
  open,
  type,
  item,
  managers = [],
  isSaving = false,
  onClose,
  onSave,
}: IManagerModal) => {
  const initialValues = getInitialFormValues(type, item)
  const [isEditing, setIsEditing] = useState(() => getInitialEditingState(type))
  const [name, setName] = useState(initialValues.name)
  const [email, setEmail] = useState(initialValues.email)
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(initialValues.status)
  const [storeId, setStoreId] = useState<TStoreSelection>(initialValues.storeId)
  const [replacementManagerId, setReplacementManagerId] =
    useState<TStoreSelection>('')

  const { responseBranches: branchesData } = useSendQuery<
    IBranch[],
    'Branches'
  >({
    queryKey: BRANCHES_QUERY_KEY,
    apiPromise: getBranches,
    suffix: 'Branches',
  })
  const branches = branchesData ?? []

  const isDeactivating = isManagerDeactivating(item, status, isEditing)
  const replacementManagers = useMemo(
    () => getReplacementManagers(managers, item?.id, storeId, isDeactivating),
    [isDeactivating, item?.id, managers, storeId],
  )

  const handleSave = () => {
    if (storeId === '') return

    onSave(
      getManagerSaveData(
        type,
        name,
        email,
        password,
        status,
        storeId,
        isDeactivating,
        replacementManagerId,
      ),
    )
  }

  const hasName = name.trim().length > 0
  const hasEmail = email.trim().length > 0
  const hasPassword = type !== 'create' || password.trim().length > 0
  const needsStore = isEditing
  const hasRequiredStore = !needsStore || storeId !== ''
  const hasRequiredReplacement =
    replacementManagers.length === 0 || replacementManagerId !== ''
  const isFormValid = isManagerFormValid([
    hasName,
    hasEmail,
    hasPassword,
    hasRequiredStore,
    hasRequiredReplacement,
  ])
  const handleClose = () => {
    if (!isSaving) onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} data-testid="modal-manager">
      <S.BoxModal>
        <S.Title>{getModalTitle(type)}</S.Title>
        <ManagerModalHelper type={type} />

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
          setStatus={(nextStatus) => {
            setStatus(nextStatus)
            setReplacementManagerId('')
          }}
          storeId={storeId}
          setStoreId={setStoreId}
          replacementManagerId={replacementManagerId}
          setReplacementManagerId={setReplacementManagerId}
          replacementManagers={replacementManagers}
          branches={branches}
          storeName={item?.store_name ?? ''}
        />

        <ActionButtons
          isEditing={isEditing}
          isFormValid={isFormValid}
          isSaving={isSaving}
          type={type}
          onClose={handleClose}
          onSave={handleSave}
          onStartEditing={() => setIsEditing(true)}
        />
      </S.BoxModal>
    </Modal>
  )
}
