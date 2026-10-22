import type { AxiosResponse } from 'axios'
import { coreApi, normalizeApiError } from '@/services/api-client'
import type { IProfile } from '@/types'

export const PROFILE_QUERY_KEY = ['/profile']

export const getProfile = async (
  signal?: AbortSignal,
): Promise<AxiosResponse<IProfile>> => {
  try {
    return await coreApi.get<IProfile>('/profile', { signal })
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar o seu perfil.')
  }
}
