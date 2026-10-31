import { useNavigate } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { FlowBarList, type IFlowBarItem } from '@/components/commom/FlowBar'
import { MetricTile } from '@/components/commom/DetailCard/styles'
import { useDashboardSummary } from '@/hooks/useDashboardSummary'
import type { IDashboardSummary } from '@/types'
import theme from '@/styles/theme'
import * as S from './styles'

const DEFAULT_SUMMARY: IDashboardSummary = {
  total_products: 0,
  high_risk_products: 0,
  medium_risk_products: 0,
  low_risk_products: 0,
  suggested_actions: 0,
  suggested_promotions: 0,
  suggested_stock_orders: 0,
  near_expiry_products: 0,
  stockout_products: 0,
  overstock_products: 0,
  active_actions: 0,
}

const calcPercentage = (value: number, total: number): number => {
  if (total <= 0) return 0
  return Math.round((value / total) * 100)
}

const buildFlowItems = (s: IDashboardSummary): IFlowBarItem[] => {
  const total = s.total_products
  const highPct = calcPercentage(s.high_risk_products, total)
  const medPct = calcPercentage(s.medium_risk_products, total)
  const lowPct = calcPercentage(s.low_risk_products, total)

  return [
    {
      id: 'high',
      label: 'Fluxo Alto (Ruptura iminente)',
      value: `${s.high_risk_products} itens`,
      detail: `${highPct}%`,
      percentage: highPct,
      color: theme.colors.red,
    },
    {
      id: 'medium',
      label: 'Fluxo Médio (Estoque equilibrado)',
      value: `${s.medium_risk_products} itens`,
      detail: `${medPct}%`,
      percentage: medPct,
      color: theme.colors.orange,
    },
    {
      id: 'low',
      label: 'Fluxo Baixo (Risco de excesso/vencimento)',
      value: `${s.low_risk_products} itens`,
      detail: `${lowPct}%`,
      percentage: lowPct,
      color: theme.colors.green2,
    },
  ]
}

const StockFlowColumn = ({
  summary,
  isLoading,
}: {
  summary: IDashboardSummary | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <S.CardContainer>
        <Skeleton
          variant="rectangular"
          height={160}
          sx={{ borderRadius: '0.8rem' }}
        />
      </S.CardContainer>
    )
  }

  const s = summary ?? DEFAULT_SUMMARY
  const items = buildFlowItems(s)

  return (
    <S.CardContainer>
      <FlowBarList items={items} />
    </S.CardContainer>
  )
}

interface IMiniKpiConfig {
  id: string
  title: string
  value: number
}

const buildMiniKpis = (s: IDashboardSummary): IMiniKpiConfig[] => [
  {
    id: 'total',
    title: 'Produtos cadastrados',
    value: s.total_products,
  },
  {
    id: 'actions',
    title: 'Ações ativas',
    value: s.active_actions,
  },
  {
    id: 'expiry',
    title: 'Perto do vencimento',
    value: s.near_expiry_products,
  },
  {
    id: 'promotions',
    title: 'Promoções sugeridas',
    value: s.suggested_promotions,
  },
]

const MiniKpisColumn = ({
  summary,
  isLoading,
}: {
  summary: IDashboardSummary | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <S.CardContainer>
        <Skeleton
          variant="rectangular"
          height={160}
          sx={{ borderRadius: '0.8rem' }}
        />
      </S.CardContainer>
    )
  }

  const s = summary ?? DEFAULT_SUMMARY
  const kpis = buildMiniKpis(s)

  return (
    <S.CardContainer>
      <S.MiniKpisGrid>
        {kpis.map((kpi) => (
          <MetricTile key={kpi.id}>
            <strong>{kpi.value}</strong>
            <span>{kpi.title}</span>
          </MetricTile>
        ))}
      </S.MiniKpisGrid>
    </S.CardContainer>
  )
}

const ReducedDashboard = () => {
  const navigate = useNavigate()

  const { summary, isLoading } = useDashboardSummary()

  return (
    <S.Wrapper>
      <S.Column>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={'Fluxo de Estoque'} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
        </S.Header>
        <S.Content>
          <StockFlowColumn summary={summary} isLoading={isLoading} />
        </S.Content>
      </S.Column>

      <S.Column>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab label={"Seus KPI's"} index={0} />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
          <ButtonComponent
            variant="outlined"
            onClick={() => void navigate('/dashboards')}
          >
            Mais detalhes
          </ButtonComponent>
        </S.Header>
        <S.Content>
          <MiniKpisColumn summary={summary} isLoading={isLoading} />
        </S.Content>
      </S.Column>
    </S.Wrapper>
  )
}

export default ReducedDashboard
