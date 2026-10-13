import { coreApi, normalizeApiError } from '@/services/api-client'
import type { IProfile } from '@/types'

export const PROFILE_QUERY_KEY = ['/profile']

export const getProfile = async () => {
  try {
    return await coreApi.get<IProfile>('/profile')
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar o seu perfil.')
  }
}
