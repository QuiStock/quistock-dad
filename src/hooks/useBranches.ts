import { useSendQuery } from '@/hooks/useSendQuery'
import { getBranches, BRANCHES_QUERY_KEY } from '@/services/api-branches'
import type { IBranch } from '@/types'

interface IUseBranchesResult {
  branches: IBranch[] | null
  isLoadingBranches: boolean
}

export const useBranches = (): IUseBranchesResult => {
  const { responseBranches, isLoadingBranches } = useSendQuery<
    IBranch[],
    'Branches'
  >({
    queryKey: BRANCHES_QUERY_KEY,
    apiPromise: getBranches,
    suffix: 'Branches',
  })

  return { branches: responseBranches, isLoadingBranches }
}
