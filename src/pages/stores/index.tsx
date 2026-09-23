import { Page } from '@/components/commom/Page'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { StoresPartial } from '@/partials/StoresPartial'

const Stores = () => {
  return (
    <Page title={'Lojas'}>
      <TabsCompoundComponent.Root>
        <TabsCompoundComponent.List>
          <TabsCompoundComponent.Tab label={'Lojas'} index={0} />
        </TabsCompoundComponent.List>
        <TabsCompoundComponent.Panel index={0}>
          <StoresPartial />
        </TabsCompoundComponent.Panel>
      </TabsCompoundComponent.Root>
    </Page>
  )
}

export default Stores
