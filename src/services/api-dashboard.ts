import type { AxiosResponse } from 'axios'
import { coreApi, normalizeApiError } from '@/services/api-client'
import type { IDashboardSummary } from '@/types'

export const DASHBOARD_SUMMARY_QUERY_KEY = ['/dashboard/summary']
export const storeDashboardSummaryQueryKey = (storeId: number) => [
  ...DASHBOARD_SUMMARY_QUERY_KEY,
  storeId,
]

export const getDashboardSummary = async (
  signal?: AbortSignal,
  storeId?: number,
): Promise<AxiosResponse<IDashboardSummary>> => {
  try {
    return await coreApi.get<IDashboardSummary>('/dashboard/summary', {
      signal,
      params: storeId === undefined ? undefined : { store_id: storeId },
    })
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível carregar as métricas do dashboard.',
    )
  }
}
