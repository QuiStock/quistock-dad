import { isAxiosError, type AxiosResponse } from 'axios'

import { coreApi, normalizeApiError } from '@/services/api-client'
import type {
  IApiErrorResponse,
  ICreateManagerPayload,
  IManager,
  IUpdateManagerPayload,
} from '@/types'
import {
  validateManagerCreatePayload,
  validateManagerUpdatePayload,
} from '@/utils/validateForms'

export const DEACTIVATION_REQUIRES_REPLACEMENT_MESSAGE =
  'Não foi possível inativar: a filial possui funcionários ativos e exige um gerente substituto ativo na mesma filial.'

export const MANAGERS_QUERY_KEY = ['/managers']
export const managerDetailQueryKey = (id: string | number) => [
  '/managers',
  String(id),
]

export const getManagers = async (
  signal?: AbortSignal,
  storeId?: number,
): Promise<AxiosResponse<IManager[]>> => {
  try {
    return await coreApi.get<IManager[]>('/managers', {
      signal,
      params: storeId === undefined ? undefined : { store_id: storeId },
    })
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
      email: payload.email.trim().toLowerCase(),
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
      validationErrors.payload ??
      validationErrors.name ??
      validationErrors.email ??
      validationErrors.store_id ??
      validationErrors.replacement_manager_id
    if (validationError) throw new Error(validationError)

    return await coreApi.patch<IManager>(`/managers/${id}`, {
      ...payload,
      name: payload.name?.trim(),
      email: payload.email?.trim().toLowerCase(),
    })
  } catch (error) {
    const normalizedError = normalizeApiError(
      error,
      'Não foi possível atualizar o gerente.',
    )
    if (
      payload.status === 'INACTIVE' &&
      payload.replacement_manager_id === undefined &&
      isAxiosError<IApiErrorResponse>(normalizedError) &&
      normalizedError.response?.status === 400
    ) {
      normalizedError.response.data = {
        ...normalizedError.response.data,
        message: DEACTIVATION_REQUIRES_REPLACEMENT_MESSAGE,
      }
    }
    throw normalizedError
  }
}
