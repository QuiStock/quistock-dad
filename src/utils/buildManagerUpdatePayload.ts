import type { IManager, ISaveManagerData, IUpdateManagerPayload } from '@/types'

export const buildManagerUpdatePayload = (
  existing: IManager,
  data: ISaveManagerData,
): IUpdateManagerPayload => {
  const payload: IUpdateManagerPayload = {}

  const name = data.name.trim()
  if (name !== existing.name) payload.name = name

  const email = data.email.trim().toLowerCase()
  if (email !== existing.email.trim().toLowerCase()) payload.email = email

  if (data.status && data.status !== existing.status)
    payload.status = data.status

  const resultingStatus = data.status ?? existing.status

  if (resultingStatus === 'ACTIVE') {
    const isReactivating = existing.status === 'INACTIVE'
    const hasNoStore = existing.store_id === null
    const storeChanged = data.store_id !== existing.store_id
    if (isReactivating || hasNoStore || storeChanged)
      payload.store_id = data.store_id
  }

  if (
    payload.status === 'INACTIVE' &&
    data.replacement_manager_id !== undefined
  )
    payload.replacement_manager_id = data.replacement_manager_id

  return payload
}

export const isEmptyManagerUpdatePayload = (payload: IUpdateManagerPayload) =>
  Object.values(payload).every((value) => value === undefined)
