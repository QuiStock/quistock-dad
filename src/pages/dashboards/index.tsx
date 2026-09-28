import { Page } from '@/components/commom/Page'
import Dashboards from '@/components/dashboards/Dashboards'

const DashboardsPage = () => {
  return (
    <Page
      title="Dashboards"
      children={
        <>
          <Dashboards />
        </>
      }
    />
  )
}

export default DashboardsPage
