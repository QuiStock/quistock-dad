import { Page } from '@/components/commom/Page'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ManagersPartial } from '@/partials/ManagersPartial'

const Managers = () => {
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
