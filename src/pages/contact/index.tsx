import { Page } from '@/components/commom/Page'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ContactPartial } from '@/partials/ContactPartial'

const Contact = () => {
    return (
        <Page title={'Contato'}>
            <TabsCompoundComponent.Root>
                <TabsCompoundComponent.List>
                    <TabsCompoundComponent.Tab label={'Contato'} index={0} />
                </TabsCompoundComponent.List>
                <TabsCompoundComponent.Panel index={0}>
                    <ContactPartial />
                </TabsCompoundComponent.Panel>
            </TabsCompoundComponent.Root>
        </Page>
    )
}

export default Contact
