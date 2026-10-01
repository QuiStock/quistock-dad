import { Page } from '@/components/commom/Page'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { NotificationsPartial } from '@/partials/NotificationsPartial'

const Notifications = () => {
  return (
    <Page title={'Notificações'}>
      <TabsCompoundComponent.Root>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab label={'Notificações'} index={0} />
        </TabsCompoundComponent.List>
        <TabsCompoundComponent.Panel index={0}>
          <NotificationsPartial />
        </TabsCompoundComponent.Panel>
      </TabsCompoundComponent.Root>
    </Page>
  )
}

export default Notifications
