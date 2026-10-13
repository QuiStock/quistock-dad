import { coreApi, normalizeApiError } from '@/services/api-client'
import type { IDashboardSummary } from '@/types'

export const DASHBOARD_SUMMARY_QUERY_KEY = ['/dashboard/summary']

export const getDashboardSummary = async () => {
  try {
    return await coreApi.get<IDashboardSummary>('/dashboard/summary')
  } catch (error) {
    throw normalizeApiError(
      error,
      'Não foi possível carregar as métricas do dashboard.',
    )
  }
}
