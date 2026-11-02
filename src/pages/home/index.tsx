import { Page } from '@/components/commom/Page'
import { StoresPartial } from '@/partials/StoresPartial'
import ReducedDashboard from '@/components/home/ReducedDashboard'
import * as S from './styles'

const Home = () => {
  return (
    <Page
      title="Home"
      children={
        <S.Stack>
          <ReducedDashboard />
          <StoresPartial />
        </S.Stack>
      }
    />
  )
}

export default Home
