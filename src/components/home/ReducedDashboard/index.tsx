import { useNavigate } from 'react-router-dom'
import { Skeleton } from '@mui/material'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { useSendQuery } from '@/hooks/useSendQuery'
import {
  getDashboardSummary,
  DASHBOARD_SUMMARY_QUERY_KEY,
} from '@/services/api-dashboard'
import type { IDashboardSummary } from '@/types'
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

interface IFlowBarItem {
  id: string
  label: string
  count: number
  percentage: number
  color: string
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
      count: s.high_risk_products,
      percentage: highPct,
      color: '#D32F2F',
    },
    {
      id: 'medium',
      label: 'Fluxo Médio (Estoque equilibrado)',
      count: s.medium_risk_products,
      percentage: medPct,
      color: '#ED6C02',
    },
    {
      id: 'low',
      label: 'Fluxo Baixo (Risco de excesso/vencimento)',
      count: s.low_risk_products,
      percentage: lowPct,
      color: '#4CAF50',
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
      <S.FlowBarGroup>
        {items.map((item) => (
          <S.FlowItem key={item.id}>
            <S.FlowItemHeader>
              <span>{item.label}</span>
              <span>
                {item.count} itens ({item.percentage}%)
              </span>
            </S.FlowItemHeader>
            <S.FlowTrack>
              <S.FlowFill $percentage={item.percentage} $color={item.color} />
            </S.FlowTrack>
          </S.FlowItem>
        ))}
      </S.FlowBarGroup>
    </S.CardContainer>
  )
}

interface IMiniKpiConfig {
  id: string
  borderColor: string
  title: string
  value: number
  color: string
}

const buildMiniKpis = (s: IDashboardSummary): IMiniKpiConfig[] => [
  {
    id: 'total',
    borderColor: '#7623E1',
    title: 'Produtos Cadastrados',
    value: s.total_products,
    color: '#7623E1',
  },
  {
    id: 'actions',
    borderColor: '#0091ff',
    title: 'Ações Ativas',
    value: s.active_actions,
    color: '#0091ff',
  },
  {
    id: 'expiry',
    borderColor: '#FF9800',
    title: 'Perto do Vencimento',
    value: s.near_expiry_products,
    color: '#FF9800',
  },
  {
    id: 'promotions',
    borderColor: '#AF36DF',
    title: 'Promoções Sugeridas',
    value: s.suggested_promotions,
    color: '#AF36DF',
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
          <S.MiniKpi key={kpi.id} $borderColor={kpi.borderColor}>
            <S.MiniKpiTitle>{kpi.title}</S.MiniKpiTitle>
            <S.MiniKpiValue $color={kpi.color}>{kpi.value}</S.MiniKpiValue>
          </S.MiniKpi>
        ))}
      </S.MiniKpisGrid>
    </S.CardContainer>
  )
}

const ReducedDashboard = () => {
  const navigate = useNavigate()

  const {
    responseDashboardSummary: summary,
    isLoadingDashboardSummary: isLoading,
  } = useSendQuery<IDashboardSummary, 'DashboardSummary'>({
    queryKey: DASHBOARD_SUMMARY_QUERY_KEY,
    apiPromise: getDashboardSummary,
    suffix: 'DashboardSummary',
  })

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
          <MiniKpisColumn summary={summary} isLoading={isLoading} />
        </S.Content>
      </S.Column>
    </S.Wrapper>
  )
}

export default ReducedDashboard
