import { useMemo, useReducer } from 'react'

import type {
  IManager,
  IManagerFormValues,
  ISaveManagerData,
  TAccountStatus,
  TManagerFormField,
  TManagerModalType,
  TStoreSelection,
} from '@/types'
import { validateManagerForm } from '@/utils/validateForms'

const getInitialFormValues = (
  type: TManagerModalType,
  item?: IManager | null,
): IManagerFormValues => {
  if (type === 'create' || !item) {
    return {
      name: '',
      email: '',
      password: '',
      status: 'ACTIVE',
      storeId: '',
      replacementManagerId: '',
    }
  }

  return {
    name: item.name || '',
    email: item.email || '',
    password: '',
    status: item.status || 'ACTIVE',
    storeId: item.store_id ?? '',
    replacementManagerId: '',
  }
}

const getReplacementManagers = (
  managers: IManager[],
  itemId: IManager['id'] | undefined,
  storeId: IManager['store_id'] | undefined,
  isDeactivating: boolean,
) => {
  if (!isDeactivating || storeId === null || storeId === undefined) return []

  return managers.filter(
    (manager) =>
      manager.id !== itemId &&
      manager.status === 'ACTIVE' &&
      manager.store_id === storeId,
  )
}

const isManagerDeactivating = (
  item: IManager | null | undefined,
  status: TAccountStatus,
  isEditing: boolean,
) => item?.status === 'ACTIVE' && status === 'INACTIVE' && isEditing

const getInitialEditingState = (type: TManagerModalType) =>
  type === 'create' || type === 'edit'

interface IManagerFormState {
  form: IManagerFormValues
  isEditing: boolean
}

type TManagerFormAction =
  | { type: 'name_changed'; value: string }
  | { type: 'email_changed'; value: string }
  | { type: 'password_changed'; value: string }
  | { type: 'replacement_manager_changed'; value: TStoreSelection }
  | { type: 'status_changed'; value: TAccountStatus }
  | { type: 'store_changed'; value: TStoreSelection }
  | { type: 'editing_started' }

const managerFieldActions: {
  [K in TManagerFormField]: (value: IManagerFormValues[K]) => TManagerFormAction
} = {
  name: (value) => ({ type: 'name_changed', value }),
  email: (value) => ({ type: 'email_changed', value }),
  password: (value) => ({ type: 'password_changed', value }),
  replacementManagerId: (value) => ({
    type: 'replacement_manager_changed',
    value,
  }),
}

const managerFormReducer = (
  state: IManagerFormState,
  action: TManagerFormAction,
): IManagerFormState => {
  switch (action.type) {
    case 'name_changed':
      return { ...state, form: { ...state.form, name: action.value } }
    case 'email_changed':
      return { ...state, form: { ...state.form, email: action.value } }
    case 'password_changed':
      return { ...state, form: { ...state.form, password: action.value } }
    case 'replacement_manager_changed':
      return {
        ...state,
        form: { ...state.form, replacementManagerId: action.value },
      }
    case 'status_changed':
      return {
        ...state,
        form: {
          ...state.form,
          status: action.value,
          replacementManagerId: '',
        },
      }
    case 'store_changed':
      return {
        ...state,
        form: {
          ...state.form,
          storeId: action.value,
          replacementManagerId: '',
        },
      }
    case 'editing_started':
      return { ...state, isEditing: true }
  }
}

interface IUseManagerFormParams {
  type: TManagerModalType
  item?: IManager | null
  managers: IManager[]
}

export const useManagerForm = ({
  type,
  item,
  managers,
}: IUseManagerFormParams) => {
  const [state, dispatch] = useReducer(
    managerFormReducer,
    { type, item },
    ({ type: modalType, item: manager }) => ({
      isEditing: getInitialEditingState(modalType),
      form: getInitialFormValues(modalType, manager),
    }),
  )

  const setField = <K extends TManagerFormField>(
    field: K,
    value: IManagerFormValues[K],
  ) => dispatch(managerFieldActions[field](value))

  const setStatus = (status: TAccountStatus) =>
    dispatch({ type: 'status_changed', value: status })

  const setStoreId = (storeId: TStoreSelection) =>
    dispatch({ type: 'store_changed', value: storeId })

  const { form, isEditing } = state
  const isDeactivating = isManagerDeactivating(item, form.status, isEditing)
  const replacementManagers = useMemo(
    () =>
      getReplacementManagers(managers, item?.id, item?.store_id, isDeactivating),
    [isDeactivating, item?.id, item?.store_id, managers],
  )

  const validationErrors = validateManagerForm(
    form,
    replacementManagers.length > 0,
    type === 'create',
  )
  const isFormValid = Object.keys(validationErrors).length === 0

  const getSaveData = (): ISaveManagerData | null => {
    if (!isFormValid) return null

    return {
      name: form.name.trim(),
      email: form.email.trim(),
      password: type === 'create' ? form.password : undefined,
      status: form.status,
      store_id: form.storeId === '' ? undefined : form.storeId,
      replacement_manager_id:
        isDeactivating && form.replacementManagerId !== ''
          ? form.replacementManagerId
          : undefined,
    }
  }

  return {
    form,
    isEditing,
    isFormValid,
    validationErrors,
    isDeactivating,
    replacementManagers,
    setField,
    setStatus,
    setStoreId,
    startEditing: () => dispatch({ type: 'editing_started' }),
    getSaveData,
  }
}
