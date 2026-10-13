import { coreApi, normalizeApiError } from '@/services/api-client'
import type { IBranch } from '@/types'

export const BRANCHES_QUERY_KEY = ['/branches']

export const getBranches = async () => {
  try {
    return await coreApi.get<IBranch[]>('/branches')
  } catch (error) {
    throw normalizeApiError(error, 'Não foi possível carregar as lojas.')
  }
}
