import { Navigate } from 'react-router-dom'
import { Page } from '@/components/commom/Page'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { useProfile } from '@/hooks/useProfile'
import { ManagersPartial } from '@/partials/ManagersPartial'
import { canManageManagers } from '@/utils/permissions'

const Managers = () => {
  const { profile, isLoadingProfile } = useProfile()

  if (isLoadingProfile) return <LoadingMask isLoading />
  if (!canManageManagers(profile?.role)) {
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
