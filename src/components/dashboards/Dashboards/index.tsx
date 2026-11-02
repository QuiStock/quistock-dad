import { Skeleton } from '@mui/material'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { FlowBarList, type IFlowBarItem } from '@/components/commom/FlowBar'
import { useDashboardSummary } from '@/hooks/useDashboardSummary'
import type { IDashboardSummary } from '@/types'
import theme from '@/styles/theme'
import * as S from './styles'

const SKELETON_KEYS = ['sk-1', 'sk-2', 'sk-3', 'sk-4', 'sk-5', 'sk-6']

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

interface IKpiCardConfig {
  id: string
  accent: string
  header: string
  value: number
  description: string
}

const buildKpiCards = (s: IDashboardSummary): IKpiCardConfig[] => [
  {
    id: 'total',
    accent: theme.colors.brandPrimary,
    header: 'Total de produtos',
    value: s.total_products,
    description: 'Itens cadastrados no catálogo consolidado',
  },
  {
    id: 'high',
    accent: theme.colors.red,
    header: 'Risco alto (ruptura)',
    value: s.high_risk_products,
    description: `${s.stockout_products} produto(s) atualmente sem estoque`,
  },
  {
    id: 'medium',
    accent: theme.colors.orange,
    header: 'Risco médio (adequado)',
    value: s.medium_risk_products,
    description: 'Estoque equilibrado conforme histórico de vendas',
  },
  {
    id: 'low',
    accent: theme.colors.green2,
    header: 'Risco baixo (excesso)',
    value: s.low_risk_products,
    description: `${s.overstock_products} produto(s) com estoque acima do limite`,
  },
  {
    id: 'expiry',
    accent: theme.colors.golden,
    header: 'Próximos do vencimento',
    value: s.near_expiry_products,
    description: 'Lotes com validade próxima da expiração',
  },
  {
    id: 'actions',
    accent: theme.colors.brandPrimary,
    header: 'Ações sugeridas / ativas',
    value: s.active_actions,
    description: `${s.suggested_promotions} promoção(ões) e ${s.suggested_stock_orders} pedido(s)`,
  },
]

const calcPercentage = (value: number, total: number): number => {
  if (total <= 0) return 0
  return Math.round((value / total) * 100)
}

const KpiCardsSection = ({
  summary,
  isLoading,
}: {
  summary: IDashboardSummary | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <S.KpiGrid>
        {SKELETON_KEYS.map((skeletonId) => (
          <Skeleton
            key={skeletonId}
            component="li"
            variant="rectangular"
            height={130}
            sx={{ borderRadius: '0.8rem' }}
          />
        ))}
      </S.KpiGrid>
    )
  }

  const s = summary ?? DEFAULT_SUMMARY
  const cards = buildKpiCards(s)

  return (
    <S.KpiGrid>
      {cards.map((card) => (
        <S.KpiCard key={card.id}>
          <S.KpiCardHeader $accent={card.accent}>{card.header}</S.KpiCardHeader>
          <S.KpiValue>{card.value}</S.KpiValue>
          <S.KpiDescription>{card.description}</S.KpiDescription>
        </S.KpiCard>
      ))}
    </S.KpiGrid>
  )
}

const buildRiskProgressItems = (s: IDashboardSummary): IFlowBarItem[] => {
  const total = s.total_products
  const highPct = calcPercentage(s.high_risk_products, total)
  const medPct = calcPercentage(s.medium_risk_products, total)
  const lowPct = calcPercentage(s.low_risk_products, total)

  return [
    {
      id: 'high',
      label: 'Risco alto (ruptura)',
      value: s.high_risk_products,
      detail: `${highPct}%`,
      percentage: highPct,
      color: theme.colors.red,
    },
    {
      id: 'medium',
      label: 'Risco médio (equilibrado)',
      value: s.medium_risk_products,
      detail: `${medPct}%`,
      percentage: medPct,
      color: theme.colors.orange,
    },
    {
      id: 'low',
      label: 'Risco baixo (excesso)',
      value: s.low_risk_products,
      detail: `${lowPct}%`,
      percentage: lowPct,
      color: theme.colors.green2,
    },
  ]
}

const RiskDistributionChart = ({
  summary,
  isLoading,
}: {
  summary: IDashboardSummary | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={160}
        sx={{ borderRadius: '0.8rem' }}
      />
    )
  }

  const s = summary ?? DEFAULT_SUMMARY
  const items = buildRiskProgressItems(s)

  return <FlowBarList items={items} />
}

const buildActionProgressItems = (s: IDashboardSummary): IFlowBarItem[] => {
  const actionsTotal = s.suggested_actions
  const promoPct = calcPercentage(s.suggested_promotions, actionsTotal)
  const ordersPct = calcPercentage(s.suggested_stock_orders, actionsTotal)
  const expiryPct = calcPercentage(s.near_expiry_products, s.total_products)

  return [
    {
      id: 'promo',
      label: 'Promoções recomendadas',
      value: s.suggested_promotions,
      percentage: promoPct,
      color: theme.colors.brandPrimary,
    },
    {
      id: 'orders',
      label: 'Pedidos de compra recomendados',
      value: s.suggested_stock_orders,
      percentage: ordersPct,
      color: theme.colors.brandPrimary,
    },
    {
      id: 'expiry',
      label: 'Lotes próximos da validade',
      value: s.near_expiry_products,
      percentage: expiryPct,
      color: theme.colors.golden,
    },
  ]
}

const OperationalActionsChart = ({
  summary,
  isLoading,
}: {
  summary: IDashboardSummary | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <Skeleton
        variant="rectangular"
        height={160}
        sx={{ borderRadius: '0.8rem' }}
      />
    )
  }

  const s = summary ?? DEFAULT_SUMMARY
  const items = buildActionProgressItems(s)

  return <FlowBarList items={items} />
}

const Dashboards = () => {
  const { summary, isLoading } = useDashboardSummary()

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
          <KpiCardsSection summary={summary} isLoading={isLoading} />
        </S.Content>
      </S.Section>

      <S.Section>
        <S.Header>
          <TabsCompoundComponent.Root>
            <TabsCompoundComponent.List>
              <TabsCompoundComponent.Tab
                label={'Gráficos & Distribuição'}
                index={0}
              />
            </TabsCompoundComponent.List>
          </TabsCompoundComponent.Root>
        </S.Header>
        <S.Content>
          <S.ChartsContainer>
            <S.ChartCard>
              <S.ChartTitle>Distribuição de risco do estoque</S.ChartTitle>
              <RiskDistributionChart summary={summary} isLoading={isLoading} />
            </S.ChartCard>

            <S.ChartCard>
              <S.ChartTitle>Recomendações e ações operacionais</S.ChartTitle>
              <OperationalActionsChart
                summary={summary}
                isLoading={isLoading}
              />
            </S.ChartCard>
          </S.ChartsContainer>
        </S.Content>
      </S.Section>
    </S.Wrapper>
  )
}

export default Dashboards
