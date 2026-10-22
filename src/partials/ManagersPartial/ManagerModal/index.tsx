import { Modal, MenuItem } from '@mui/material'

import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputComponent } from '@/components/commom/TextInputComponent'
import { useBranches } from '@/hooks/useBranches'
import { useManagerForm } from '@/hooks/useManagerForm'
import { ManagerStatusEnum } from '@/types/enums'
import type {
  IBranch,
  IManager,
  IManagerFormValues,
  ISaveManagerData,
  TAccountStatus,
  TManagerFormFieldChange,
  TManagerModalType,
  TStoreSelection,
} from '@/types'

import * as S from './styles'

const MENU_ITEM_SX = { fontSize: '1.6rem' }
const SELECT_LABEL_SX = { '& .MuiInputLabel-root': { fontSize: '1.6rem' } }

const toStoreSelection = (value: string | number): TStoreSelection =>
  value === '' ? '' : Number(value)

interface IManagerModal {
  open: boolean
  type: TManagerModalType
  item?: IManager | null
  managers?: IManager[]
  isSaving?: boolean
  onClose: () => void
  onSave: (data: ISaveManagerData) => void
}

interface IFormFieldsProps {
  type: TManagerModalType
  isEditing: boolean
  form: IManagerFormValues
  validationErrors: ReturnType<typeof useManagerForm>['validationErrors']
  onFieldChange: TManagerFormFieldChange
  onStatusChange: (status: TAccountStatus) => void
  onStoreChange: (storeId: TStoreSelection) => void
  replacementManagers: IManager[]
  branches: IBranch[]
  storeName: string
}

const FormFields = ({
  type,
  isEditing,
  form,
  validationErrors,
  onFieldChange,
  onStatusChange,
  onStoreChange,
  replacementManagers,
  branches,
  storeName,
}: IFormFieldsProps) => {
  return (
    <S.FormContainer>
      <TextInputComponent
        label="Nome"
        value={form.name}
        error={Boolean(validationErrors.name)}
        helperText={validationErrors.name}
        slotProps={{ htmlInput: { maxLength: 100 } }}
        onChange={(e) => onFieldChange('name', e.target.value)}
        disabled={!isEditing}
      />
      <TextInputComponent
        label="E-mail"
        value={form.email}
        error={Boolean(validationErrors.email)}
        helperText={validationErrors.email}
        slotProps={{ htmlInput: { maxLength: 254 } }}
        onChange={(e) => onFieldChange('email', e.target.value)}
        disabled={!isEditing}
      />
      {type === 'create' ? (
        <TextInputComponent
          label="Senha Inicial"
          type="password"
          value={form.password}
          error={Boolean(validationErrors.password)}
          helperText={validationErrors.password}
          slotProps={{ htmlInput: { maxLength: 128 } }}
          onChange={(e) => onFieldChange('password', e.target.value)}
          disabled={!isEditing}
        />
      ) : (
        <TextInputComponent
          select
          fullWidth
          label="Status"
          value={form.status}
          onChange={(e) => onStatusChange(e.target.value as TAccountStatus)}
          disabled={!isEditing}
          sx={SELECT_LABEL_SX}
        >
          <MenuItem value="ACTIVE" sx={MENU_ITEM_SX}>
            {ManagerStatusEnum.ACTIVE}
          </MenuItem>
          <MenuItem value="INACTIVE" sx={MENU_ITEM_SX}>
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
          value={form.storeId}
          error={Boolean(validationErrors.storeId)}
          helperText={validationErrors.storeId}
          onChange={(e) => onStoreChange(toStoreSelection(e.target.value))}
          disabled={!isEditing}
          sx={SELECT_LABEL_SX}
        >
          <MenuItem value="" sx={MENU_ITEM_SX}>
            Selecione uma filial
          </MenuItem>
          {branches.map((branch) => (
            <MenuItem
              key={branch.store_id}
              sx={MENU_ITEM_SX}
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
            branches.find((branch) => branch.store_id === form.storeId)?.name ??
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
          value={form.replacementManagerId}
          error={Boolean(validationErrors.replacementManagerId)}
          helperText={validationErrors.replacementManagerId}
          onChange={(e) =>
            onFieldChange(
              'replacementManagerId',
              toStoreSelection(e.target.value),
            )
          }
          disabled={!isEditing}
          sx={SELECT_LABEL_SX}
        >
          <MenuItem value="" sx={MENU_ITEM_SX}>
            Selecione um gerente
          </MenuItem>
          {replacementManagers.map((manager) => (
            <MenuItem
              key={manager.id}
              sx={MENU_ITEM_SX}
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
  type: TManagerModalType
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

const getModalTitle = (type: TManagerModalType) =>
  type === 'create' ? 'Cadastrar novo gerente' : 'Detalhes do gerente'

interface IManagerModalHelperProps {
  id: string
  type: TManagerModalType
}

const ManagerModalHelper = ({ id, type }: IManagerModalHelperProps) =>
  type === 'create' ? (
    <S.Helper id={id}>
      Por favor, insira as informações do novo gerente.
    </S.Helper>
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
  const { branches } = useBranches()
  const {
    form,
    isEditing,
    isFormValid,
    validationErrors,
    replacementManagers,
    setField,
    setStatus,
    setStoreId,
    startEditing,
    getSaveData,
  } = useManagerForm({ type, item, managers })

  const handleSave = () => {
    const saveData = getSaveData()
    if (saveData) onSave(saveData)
  }

  const handleClose = () => {
    if (!isSaving) onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="manager-modal-title"
      aria-describedby={
        type === 'create' ? 'manager-modal-description' : undefined
      }
      data-testid="modal-manager"
    >
      <S.BoxModal>
        <S.Title id="manager-modal-title">{getModalTitle(type)}</S.Title>
        <ManagerModalHelper id="manager-modal-description" type={type} />

        <FormFields
          type={type}
          isEditing={isEditing}
          form={form}
          validationErrors={validationErrors}
          onFieldChange={setField}
          onStatusChange={setStatus}
          onStoreChange={setStoreId}
          replacementManagers={replacementManagers}
          branches={branches ?? []}
          storeName={item?.store_name ?? ''}
        />

        <ActionButtons
          isEditing={isEditing}
          isFormValid={isFormValid}
          isSaving={isSaving}
          type={type}
          onClose={handleClose}
          onSave={handleSave}
          onStartEditing={startEditing}
        />
      </S.BoxModal>
    </Modal>
  )
}
