import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import * as S from './styles'

import graficosDashboardsSvg from '@/assets/graficos-dashboards.svg'
import kpisSvg from '@/assets/kpis.svg'

const Dashboards = () => {
  return (
    <S.Wrapper>
      <S.Section>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={"KPI's"} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
        </S.Header>
        <S.Content>
          <img src={kpisSvg} alt="KPI's" />
        </S.Content>
      </S.Section>

      <S.Section>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={'Gráficos'} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
        </S.Header>
        <S.Content>
          <img src={graficosDashboardsSvg} alt="Gráficos" />
        </S.Content>
      </S.Section>
    </S.Wrapper>
  )
}

export default Dashboards
