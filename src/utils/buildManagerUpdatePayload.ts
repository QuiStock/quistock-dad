import type { IManager, ISaveManagerData, IUpdateManagerPayload } from '@/types'

const getIdentityChanges = (
  existing: IManager,
  data: ISaveManagerData,
): IUpdateManagerPayload => {
  const changes: IUpdateManagerPayload = {}

  const name = data.name.trim()
  if (name !== existing.name) changes.name = name

  const email = data.email.trim().toLowerCase()
  if (email !== existing.email.trim().toLowerCase()) changes.email = email

  return changes
}

const shouldSendStore = (existing: IManager, data: ISaveManagerData) => {
  const resultingStatus = data.status ?? existing.status
  if (resultingStatus !== 'ACTIVE') return false

  const isReactivating = existing.status === 'INACTIVE'
  const hasNoStore = existing.store_id === null
  const storeChanged = (data.store_id ?? null) !== existing.store_id
  return isReactivating || hasNoStore || storeChanged
}

export const buildManagerUpdatePayload = (
  existing: IManager,
  data: ISaveManagerData,
): IUpdateManagerPayload => {
  const payload = getIdentityChanges(existing, data)

  if (data.status && data.status !== existing.status)
    payload.status = data.status

  if (shouldSendStore(existing, data)) payload.store_id = data.store_id

  if (payload.status === 'INACTIVE' && data.replacement_manager_id)
    payload.replacement_manager_id = data.replacement_manager_id

  return payload
}

export const isEmptyManagerUpdatePayload = (payload: IUpdateManagerPayload) =>
  Object.values(payload).every((value) => value === undefined)
