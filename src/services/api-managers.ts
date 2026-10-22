import type { AxiosResponse } from 'axios'

import { coreApi, normalizeApiError } from '@/services/api-client'
import type {
  ICreateManagerPayload,
  IManager,
  IUpdateManagerPayload,
} from '@/types'
import {
  validateManagerCreatePayload,
  validateManagerUpdatePayload,
} from '@/utils/validateForms'

export const MANAGERS_QUERY_KEY = ['/managers']
export const managerDetailQueryKey = (id: string | number) => [
  '/managers',
  String(id),
]

export const getManagers = async (
  signal?: AbortSignal,
): Promise<AxiosResponse<IManager[]>> => {
  try {
    return await coreApi.get<IManager[]>('/managers', { signal })
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar os gerentes.')
  }
}

export const getManagerById = async (
  id: string | number,
  signal?: AbortSignal,
): Promise<AxiosResponse<IManager>> => {
  try {
    return await coreApi.get<IManager>(`/managers/${id}`, { signal })
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar o gerente.')
  }
}

export const createManager = async (
  payload: ICreateManagerPayload,
): Promise<AxiosResponse<IManager>> => {
  try {
    const validationErrors = validateManagerCreatePayload(payload)
    const validationError =
      validationErrors.name ??
      validationErrors.email ??
      validationErrors.password ??
      validationErrors.storeId
    if (validationError) throw new Error(validationError)

    return await coreApi.post<IManager>('/managers', {
      ...payload,
      name: payload.name.trim(),
      email: payload.email.trim(),
    })
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível cadastrar o gerente.')
  }
}

export const updateManager = async (
  id: string | number,
  payload: IUpdateManagerPayload,
): Promise<AxiosResponse<IManager>> => {
  try {
    const validationErrors = validateManagerUpdatePayload(payload)
    const validationError =
      validationErrors.name ??
      validationErrors.email ??
      validationErrors.store_id ??
      validationErrors.replacement_manager_id
    if (validationError) throw new Error(validationError)

    return await coreApi.patch<IManager>(`/managers/${id}`, {
      ...payload,
      name: payload.name?.trim(),
      email: payload.email?.trim(),
    })
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível atualizar o gerente.')
  }
}
