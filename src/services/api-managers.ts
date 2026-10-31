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

const getUpdateValidationError = (payload: IUpdateManagerPayload) => {
  const errors = validateManagerUpdatePayload(payload)
  return (
    errors.payload ??
    errors.name ??
    errors.email ??
    errors.store_id ??
    errors.replacement_manager_id
  )
}

// The backend answers a deactivation of a manager whose store still has
// active employees, without replacement_manager_id, with a generic 400.
const isMissingReplacementError = (
  error: Error,
  payload: IUpdateManagerPayload,
) =>
  payload.status === 'INACTIVE' &&
  payload.replacement_manager_id === undefined &&
  isAxiosError<IApiErrorResponse>(error) &&
  error.response?.status === 400

const normalizeUpdateManagerError = (
  error: unknown,
  payload: IUpdateManagerPayload,
): Error => {
  const normalizedError = normalizeApiError(
    error,
    'Não foi possível atualizar o gerente.',
  )
  if (
    isMissingReplacementError(normalizedError, payload) &&
    isAxiosError<IApiErrorResponse>(normalizedError) &&
    normalizedError.response
  ) {
    normalizedError.response.data = {
      ...normalizedError.response.data,
      message: DEACTIVATION_REQUIRES_REPLACEMENT_MESSAGE,
    }
  }
  return normalizedError
}

export const updateManager = async (
  id: string | number,
  payload: IUpdateManagerPayload,
): Promise<AxiosResponse<IManager>> => {
  try {
    const validationError = getUpdateValidationError(payload)
    if (validationError) throw new Error(validationError)

    return await coreApi.patch<IManager>(`/managers/${id}`, {
      ...payload,
      name: payload.name?.trim(),
      email: payload.email?.trim().toLowerCase(),
    })
  } catch (error) {
    throw normalizeUpdateManagerError(error, payload)
  }
}
