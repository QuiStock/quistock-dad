import { Navigate } from 'react-router-dom'
import { Page } from '@/components/commom/Page'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { useSendQuery } from '@/hooks/useSendQuery'
import { ManagersPartial } from '@/partials/ManagersPartial'
import { getProfile, PROFILE_QUERY_KEY } from '@/services/api-profile'
import type { IProfile } from '@/types'

const Managers = () => {
  const { responseProfile: profile, isLoadingProfile } = useSendQuery<
    IProfile,
    'Profile'
  >({
    queryKey: PROFILE_QUERY_KEY,
    apiPromise: getProfile,
    suffix: 'Profile',
  })

  if (isLoadingProfile) return <LoadingMask isLoading />
  if (profile?.role !== 'ADMIN' && profile?.role !== 'REGIONAL_MANAGER') {
    return <Navigate to="/home" replace />
  }

  return (
    <Page title={'Gerentes'}>
      <TabsCompoundComponent.Root>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab label={'Gerentes'} index={0} />
        </TabsCompoundComponent.List>
        <TabsCompoundComponent.Panel index={0}>
          <ManagersPartial />
        </TabsCompoundComponent.Panel>
      </TabsCompoundComponent.Root>
    </Page>
  )
}

export default Managers
