import { useNavigate } from 'react-router-dom'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import * as S from './styles'

import graficoSvg from '@/assets/grafico.svg'
import cardsSvg from '@/assets/cards.svg'

const ReducedDashboard = () => {
  const navigate = useNavigate()

  return (
    <S.Wrapper>
      <S.Column>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={'Fluxo'} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
        </S.Header>
        <S.Content>
          <img src={graficoSvg} alt="Gráfico de Fluxo" />
        </S.Content>
      </S.Column>

      <S.Column>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={"Seus KPI's"} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
          <S.SeeMoreButton>
            <ButtonComponent
              variant="outlined"
              onClick={() => void navigate('/dashboards')}
            >
              Mais detalhes
            </ButtonComponent>
          </S.SeeMoreButton>
        </S.Header>
        <S.Content>
          <img src={cardsSvg} alt="Cards de KPI" />
        </S.Content>
      </S.Column>
    </S.Wrapper>
  )
}

export default ReducedDashboard
