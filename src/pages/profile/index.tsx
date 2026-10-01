import { Page } from '@/components/commom/Page'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ProfilePartial } from '@/partials/ProfilePartial'

const Profile = () => {
  return (
    <Page title={'Perfil'}>
      <TabsCompoundComponent.Root>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab label={'Perfil'} index={0} />
        </TabsCompoundComponent.List>
        <TabsCompoundComponent.Panel index={0}>
          <ProfilePartial />
        </TabsCompoundComponent.Panel>
      </TabsCompoundComponent.Root>
    </Page>
  )
}

export default Profile
