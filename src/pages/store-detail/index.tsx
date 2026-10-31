import type { ReactNode } from 'react'
import {
  ArrowBack,
  MapOutlined,
  NumbersOutlined,
  OpenInNewOutlined,
  PlaceOutlined,
  StoreOutlined,
  TagOutlined,
} from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import { useNavigate, useParams } from 'react-router-dom'

import * as S from './styles'
import { Page } from '@/components/commom/Page'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { useBranches } from '@/hooks/useBranches'
import { useProfile } from '@/hooks/useProfile'
import { useSendQuery } from '@/hooks/useSendQuery'
import {
  getDashboardSummary,
  storeDashboardSummaryQueryKey,
} from '@/services/api-dashboard'
import { getManagers, storeManagersQueryKey } from '@/services/api-managers'
import { AccountStatusLabel } from '@/types/enums'
import type { IBranch, IDashboardSummary, IManager } from '@/types'
import { canManageManagers } from '@/utils/permissions'

const NOT_INFORMED = 'Não informado'

const parseStoreId = (value?: string): number | null => {
  const storeId = Number(value?.trim())
  return Number.isInteger(storeId) && storeId > 0 ? storeId : null
}

const formatLocation = (branch: IBranch) => {
  const parts = [branch.city, branch.state].filter(Boolean)
  return parts.length > 0 ? parts.join(' - ') : NOT_INFORMED
}

interface IDetailItemProps {
  icon: ReactNode
  label: string
  children: ReactNode
}

const DetailItem = ({ icon, label, children }: IDetailItemProps) => (
  <S.DetailItem>
    {icon}
    <S.DetailLabel>{label}</S.DetailLabel>
    <S.DetailValue>{children}</S.DetailValue>
  </S.DetailItem>
)

const METRICS: { key: keyof IDashboardSummary; label: string }[] = [
  { key: 'total_products', label: 'Produtos analisados' },
  { key: 'active_actions', label: 'Ações ativas' },
  { key: 'suggested_promotions', label: 'Promoções sugeridas' },
  { key: 'near_expiry_products', label: 'Próximos do vencimento' },
  { key: 'stockout_products', label: 'Em ruptura' },
  { key: 'overstock_products', label: 'Com excesso de estoque' },
]

interface IStoreMetricsProps {
  summary: IDashboardSummary | null
  isLoading: boolean
}

const StoreMetrics = ({ summary, isLoading }: IStoreMetricsProps) => {
  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={96} />
  }
  if (!summary) {
    return (
      <S.EmptyText>
        Não foi possível carregar os indicadores da loja.
      </S.EmptyText>
    )
  }

  return (
    <S.MetricGrid>
      {METRICS.map(({ key, label }) => (
        <S.MetricTile key={key}>
          <strong>{summary[key]}</strong>
          <span>{label}</span>
        </S.MetricTile>
      ))}
    </S.MetricGrid>
  )
}

interface IStoreManagersProps {
  managers: IManager[] | null
  isLoading: boolean
  onOpenManager: (id: string) => void
}

const StoreManagers = ({
  managers,
  isLoading,
  onOpenManager,
}: IStoreManagersProps) => {
  if (isLoading) {
    return <Skeleton variant="rounded" width="100%" height={64} />
  }
  if (!managers || managers.length === 0) {
    return <S.EmptyText>Nenhum gerente vinculado a esta loja.</S.EmptyText>
  }

  return (
    <S.ManagerList>
      {managers.map((manager) => (
        <S.ManagerItem key={manager.id}>
          <S.ManagerInfo>
            <strong>{manager.name}</strong>
            <span>{manager.email}</span>
            <S.StatusBadge $active={manager.status === 'ACTIVE'}>
              {AccountStatusLabel[manager.status]}
            </S.StatusBadge>
          </S.ManagerInfo>
          <ButtonWithIcon
            variant="outlined"
            icon={<OpenInNewOutlined />}
            onClick={() => onOpenManager(manager.id)}
            aria-label={`Ver gerente ${manager.name}`}
          >
            Ver gerente
          </ButtonWithIcon>
        </S.ManagerItem>
      ))}
    </S.ManagerList>
  )
}

const StoreDetailSkeleton = () => (
  <S.Card aria-busy="true" aria-label="Carregando loja">
    <S.SkeletonIdentity>
      <Skeleton variant="circular" width="8.8rem" height="8.8rem" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" height={36} />
        <Skeleton variant="text" width="25%" height={24} />
      </div>
    </S.SkeletonIdentity>
    <S.Sections>
      <S.Section>
        <Skeleton variant="text" width="50%" height={28} />
        <Skeleton variant="text" width="80%" height={24} />
      </S.Section>
      <S.Section>
        <Skeleton variant="text" width="50%" height={28} />
        <Skeleton variant="text" width="80%" height={24} />
      </S.Section>
    </S.Sections>
  </S.Card>
)

interface IStoreDetailCardProps {
  branch: IBranch
  canSeeManagers: boolean
}

const StoreDetailCard = ({ branch, canSeeManagers }: IStoreDetailCardProps) => {
  const navigate = useNavigate()

  const { responseStoreSummary, isLoadingStoreSummary } = useSendQuery<
    IDashboardSummary,
    'StoreSummary'
  >({
    queryKey: storeDashboardSummaryQueryKey(branch.store_id),
    apiPromise: (signal) => getDashboardSummary(signal, branch.store_id),
    suffix: 'StoreSummary',
  })

  const { responseStoreManagers, isLoadingStoreManagers } = useSendQuery<
    IManager[],
    'StoreManagers'
  >({
    queryKey: storeManagersQueryKey(branch.store_id),
    apiPromise: (signal) => getManagers(signal, branch.store_id),
    suffix: 'StoreManagers',
    options: { enabled: canSeeManagers },
  })

  return (
    <S.Card aria-labelledby="store-detail-name">
      <S.Identity>
        <S.StoreAvatar aria-hidden="true">
          <StoreOutlined />
        </S.StoreAvatar>
        <S.IdentityText>
          <S.Name id="store-detail-name">{branch.name}</S.Name>
          <S.Subtitle>{`Código ERP ${branch.id}`}</S.Subtitle>
          <S.StatusBadge $active>Ativa</S.StatusBadge>
        </S.IdentityText>
      </S.Identity>

      <S.Sections>
        <S.Section aria-labelledby="store-detail-location">
          <S.SectionTitle id="store-detail-location">
            Localização
          </S.SectionTitle>
          <S.DetailList>
            <DetailItem icon={<MapOutlined />} label="Cidade / Estado">
              {formatLocation(branch)}
            </DetailItem>
            <DetailItem icon={<PlaceOutlined />} label="Endereço">
              {branch.address ?? NOT_INFORMED}
            </DetailItem>
          </S.DetailList>
        </S.Section>

        <S.Section aria-labelledby="store-detail-identification">
          <S.SectionTitle id="store-detail-identification">
            Identificação
          </S.SectionTitle>
          <S.DetailList>
            <DetailItem icon={<TagOutlined />} label="Código ERP">
              {branch.id}
            </DetailItem>
            <DetailItem icon={<NumbersOutlined />} label="ID da loja">
              {branch.store_id}
            </DetailItem>
          </S.DetailList>
        </S.Section>
      </S.Sections>

      <S.FullSection aria-labelledby="store-detail-metrics">
        <S.SectionTitle id="store-detail-metrics">Indicadores</S.SectionTitle>
        <StoreMetrics
          summary={responseStoreSummary}
          isLoading={isLoadingStoreSummary}
        />
      </S.FullSection>

      {canSeeManagers && (
        <S.FullSection aria-labelledby="store-detail-managers">
          <S.SectionTitle id="store-detail-managers">Gerentes</S.SectionTitle>
          <StoreManagers
            managers={responseStoreManagers}
            isLoading={isLoadingStoreManagers}
            onOpenManager={(managerId) => {
              void navigate(`/gerentes/${encodeURIComponent(managerId)}`)
            }}
          />
        </S.FullSection>
      )}
    </S.Card>
  )
}

const Feedback = ({ title, message }: { title: string; message: string }) => (
  <S.Feedback role="alert">
    <strong>{title}</strong>
    <p>{message}</p>
  </S.Feedback>
)

const StoreDetailContent = ({ storeId }: { storeId: number | null }) => {
  const { branches, isLoadingBranches } = useBranches()
  const { profile } = useProfile()

  if (storeId === null) {
    return (
      <Feedback
        title="Identificador da loja inválido."
        message="Volte para a lista e escolha uma loja."
      />
    )
  }

  if (isLoadingBranches) return <StoreDetailSkeleton />

  // /branches returns only the active stores within the caller's scope.
  const branch = branches?.find((item) => item.store_id === storeId)
  if (!branch) {
    return (
      <Feedback
        title="Loja não encontrada."
        message="A loja não existe, está inativa ou fora do seu escopo de acesso."
      />
    )
  }

  return (
    <StoreDetailCard
      branch={branch}
      canSeeManagers={canManageManagers(profile?.role)}
    />
  )
}

const StoreDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  return (
    <Page title={'Detalhes da loja'}>
      <S.Wrapper>
        <S.Toolbar>
          <ButtonWithIcon
            variant="outlined"
            icon={<ArrowBack />}
            onClick={() => {
              void navigate('/lojas')
            }}
          >
            Voltar
          </ButtonWithIcon>
        </S.Toolbar>

        <StoreDetailContent storeId={parseStoreId(id)} />
      </S.Wrapper>
    </Page>
  )
}

export default StoreDetail
