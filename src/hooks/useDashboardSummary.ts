import { useSendQuery } from '@/hooks/useSendQuery'
import {
  getDashboardSummary,
  DASHBOARD_SUMMARY_QUERY_KEY,
} from '@/services/api-dashboard'
import type { IDashboardSummary } from '@/types'

interface IUseDashboardSummaryResult {
  summary: IDashboardSummary | null
  isLoading: boolean
}

export const useDashboardSummary = (): IUseDashboardSummaryResult => {
  const { responseDashboardSummary, isLoadingDashboardSummary } = useSendQuery<
    IDashboardSummary,
    'DashboardSummary'
  >({
    queryKey: DASHBOARD_SUMMARY_QUERY_KEY,
    apiPromise: getDashboardSummary,
    suffix: 'DashboardSummary',
  })

  return {
    summary: responseDashboardSummary,
    isLoading: isLoadingDashboardSummary,
  }
}
