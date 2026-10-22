import { useSendQuery } from '@/hooks/useSendQuery'
import { getProfile, PROFILE_QUERY_KEY } from '@/services/api-profile'
import type { IProfile } from '@/types'

interface IUseProfileResult {
  profile: IProfile | null
  isLoadingProfile: boolean
}

export const useProfile = (): IUseProfileResult => {
  const { responseProfile, isLoadingProfile } = useSendQuery<
    IProfile,
    'Profile'
  >({
    queryKey: PROFILE_QUERY_KEY,
    apiPromise: getProfile,
    suffix: 'Profile',
  })

  return { profile: responseProfile, isLoadingProfile }
}
