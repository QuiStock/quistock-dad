import { isAxiosError } from 'axios'

import type { IApiErrorResponse } from '@/types'

const STATUS_MESSAGES: Record<number, string> = {
  400: 'Dados inválidos. Verifique os campos e tente novamente.',
  401: 'Sua sessão expirou. Faça login novamente.',
  403: 'Você não tem permissão para realizar esta ação.',
  404: 'Registro não encontrado.',
  409: 'Já existe um registro com estes dados.',
  503: 'Serviço indisponível no momento. Tente novamente mais tarde.',
}

const extractErrorMessage = (
  response: { status: number; data: unknown },
  fallbackMessage: string,
): string => {
  const data = response.data
  if (data && typeof data === 'object' && 'message' in data) {
    const customMessage = (data as IApiErrorResponse).message
    if (customMessage) return customMessage
  }

  return STATUS_MESSAGES[response.status] ?? fallbackMessage
}

export const normalizeApiError = (
  error: unknown,
  fallbackMessage: string,
): Error => {
  if (!isAxiosError<IApiErrorResponse>(error)) {
    return error instanceof Error ? error : new Error(fallbackMessage)
  }

  if (error.response) {
    const resolvedMessage = extractErrorMessage(error.response, fallbackMessage)
    const existingData =
      typeof error.response.data === 'object' ? error.response.data : {}

    error.response.data = {
      ...existingData,
      message: resolvedMessage,
    }
  }

  return error
}
