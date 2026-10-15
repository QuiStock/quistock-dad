import { Skeleton } from '@mui/material'
import { TabsCompoundComponent } from '@/components/commom/TabsCompoundComponent'
import { useSendQuery } from '@/hooks/useSendQuery'
import {
  getDashboardSummary,
  DASHBOARD_SUMMARY_QUERY_KEY,
} from '@/services/api-dashboard'
import type { IDashboardSummary } from '@/types'
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
  borderColor: string
  header: string
  value: number
  color: string
  description: string
}

const buildKpiCards = (s: IDashboardSummary): IKpiCardConfig[] => [
  {
    id: 'total',
    borderColor: '#7623E1',
    header: 'Total de Produtos',
    value: s.total_products,
    color: '#7623E1',
    description: 'Itens cadastrados no catálogo consolidado',
  },
  {
    id: 'high',
    borderColor: '#D32F2F',
    header: 'Risco Alto (Ruptura)',
    value: s.high_risk_products,
    color: '#D32F2F',
    description: `${s.stockout_products} produto(s) atualmente sem estoque`,
  },
  {
    id: 'medium',
    borderColor: '#ED6C02',
    header: 'Risco Médio (Adequado)',
    value: s.medium_risk_products,
    color: '#ED6C02',
    description: 'Estoque equilibrado conforme histórico de vendas',
  },
  {
    id: 'low',
    borderColor: '#4CAF50',
    header: 'Risco Baixo (Excesso)',
    value: s.low_risk_products,
    color: '#4CAF50',
    description: `${s.overstock_products} produto(s) com estoque acima do limite`,
  },
  {
    id: 'expiry',
    borderColor: '#FF9800',
    header: 'Próximos do Vencimento',
    value: s.near_expiry_products,
    color: '#FF9800',
    description: 'Lotes com validade próxima da expiração',
  },
  {
    id: 'actions',
    borderColor: '#0091ff',
    header: 'Ações Sugeridas / Ativas',
    value: s.active_actions,
    color: '#0091ff',
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
        <S.KpiCard key={card.id} $borderColor={card.borderColor}>
          <S.KpiCardHeader>{card.header}</S.KpiCardHeader>
          <S.KpiValue $color={card.color}>{card.value}</S.KpiValue>
          <S.KpiDescription>{card.description}</S.KpiDescription>
        </S.KpiCard>
      ))}
    </S.KpiGrid>
  )
}

interface IProgressItem {
  id: string
  label: string
  valueLabel: string
  percentage: number
  color: string
}

const buildRiskProgressItems = (s: IDashboardSummary): IProgressItem[] => {
  const total = s.total_products
  const highPct = calcPercentage(s.high_risk_products, total)
  const medPct = calcPercentage(s.medium_risk_products, total)
  const lowPct = calcPercentage(s.low_risk_products, total)

  return [
    {
      id: 'high',
      label: 'Risco Alto (Ruptura)',
      valueLabel: `${s.high_risk_products} (${highPct}%)`,
      percentage: highPct,
      color: '#D32F2F',
    },
    {
      id: 'medium',
      label: 'Risco Médio (Equilibrado)',
      valueLabel: `${s.medium_risk_products} (${medPct}%)`,
      percentage: medPct,
      color: '#ED6C02',
    },
    {
      id: 'low',
      label: 'Risco Baixo (Excesso)',
      valueLabel: `${s.low_risk_products} (${lowPct}%)`,
      percentage: lowPct,
      color: '#4CAF50',
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

  return (
    <>
      {items.map((item) => (
        <S.ProgressBarWrapper key={item.id}>
          <S.ProgressBarHeader>
            <span>{item.label}</span>
            <span>{item.valueLabel}</span>
          </S.ProgressBarHeader>
          <S.ProgressBarTrack>
            <S.ProgressBarFill
              $percentage={item.percentage}
              $color={item.color}
            />
          </S.ProgressBarTrack>
        </S.ProgressBarWrapper>
      ))}
    </>
  )
}

const buildActionProgressItems = (s: IDashboardSummary): IProgressItem[] => {
  const actionsTotal = s.suggested_actions
  const promoPct = calcPercentage(s.suggested_promotions, actionsTotal)
  const ordersPct = calcPercentage(s.suggested_stock_orders, actionsTotal)
  const expiryPct = calcPercentage(s.near_expiry_products, s.total_products)

  return [
    {
      id: 'promo',
      label: 'Promoções Recomendadas',
      valueLabel: String(s.suggested_promotions),
      percentage: promoPct,
      color: '#AF36DF',
    },
    {
      id: 'orders',
      label: 'Pedidos de Compra Recomendados',
      valueLabel: String(s.suggested_stock_orders),
      percentage: ordersPct,
      color: '#0091ff',
    },
    {
      id: 'expiry',
      label: 'Lotes Próximos da Validade',
      valueLabel: String(s.near_expiry_products),
      percentage: expiryPct,
      color: '#FF9800',
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

  return (
    <>
      {items.map((item) => (
        <S.ProgressBarWrapper key={item.id}>
          <S.ProgressBarHeader>
            <span>{item.label}</span>
            <span>{item.valueLabel}</span>
          </S.ProgressBarHeader>
          <S.ProgressBarTrack>
            <S.ProgressBarFill
              $percentage={item.percentage}
              $color={item.color}
            />
          </S.ProgressBarTrack>
        </S.ProgressBarWrapper>
      ))}
    </>
  )
}

const Dashboards = () => {
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
              <S.ChartTitle>Distribuição de Risco do Estoque</S.ChartTitle>
              <RiskDistributionChart summary={summary} isLoading={isLoading} />
            </S.ChartCard>

            <S.ChartCard>
              <S.ChartTitle>Recomendações e Ações Operacionais</S.ChartTitle>
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
