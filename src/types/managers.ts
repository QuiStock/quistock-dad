import type { IUserAccount, TAccountStatus } from './user'

export type IManager = IUserAccount

export type TManagerModalType = 'create' | 'edit' | 'details' | null

export type TStoreSelection = number | ''

export interface ICreateManagerPayload {
  name: string
  email: string
  password: string
  store_id: number
}

export interface IUpdateManagerPayload {
  name?: string
  email?: string
  status?: TAccountStatus
  store_id?: number
  replacement_manager_id?: number
}

export interface ISaveManagerData {
  name: string
  email: string
  password?: string
  status?: TAccountStatus
  store_id?: number
  replacement_manager_id?: number
}

export interface IManagerFormValues {
  name: string
  email: string
  password: string
  status: TAccountStatus
  storeId: TStoreSelection
  replacementManagerId: TStoreSelection
}

export type TManagerFormField =
  'name' | 'email' | 'password' | 'replacementManagerId'

export type TManagerFormFieldChange = <K extends TManagerFormField>(
  field: K,
  value: IManagerFormValues[K],
) => void

export interface IManagerTableRow {
  id: string
  name: string
  email: string
  store: string
  status: string
  rawItem: IManager
}
