import { useCallback, useState, type ReactNode } from 'react'
import {
  ArrowBack,
  BadgeOutlined,
  EditOutlined,
  MailOutlined,
  PlaceOutlined,
  StoreOutlined,
} from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import { useNavigate, useParams } from 'react-router-dom'

import * as S from './styles'
import { Page } from '@/components/commom/Page'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { ManagerModal } from '@/partials/ManagersPartial/ManagerModal'
import { useManagers } from '@/hooks/useManagers'
import { useSendQuery } from '@/hooks/useSendQuery'
import { getManagerById, managerDetailQueryKey } from '@/services/api-managers'
import { ManagerStatusEnum, UserRoleLabel } from '@/types/enums'
import type { IManager, ISaveManagerData } from '@/types'

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

interface ILinkedValueProps {
  name: string | null
  code: string | null
}

const LinkedValue = ({ name, code }: ILinkedValueProps) => (
  <>
    {name ?? 'Não vinculada'}
    {name && code && <small>{`Código ${code}`}</small>}
  </>
)

const ManagerDetailSkeleton = () => (
  <S.Card aria-busy="true" aria-label="Carregando gerente">
    <S.SkeletonIdentity>
      <Skeleton variant="circular" width="8.8rem" height="8.8rem" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="40%" height={36} />
        <Skeleton variant="text" width="55%" height={24} />
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

const ManagerDetailCard = ({ manager }: { manager: IManager }) => {
  const isActive = manager.status === 'ACTIVE'
  const initial = manager.name?.[0]?.toUpperCase() ?? '?'

  return (
    <S.Card aria-labelledby="manager-detail-name">
      <S.Identity>
        <S.AvatarStyled src={manager.profile_photo_url ?? undefined} alt="">
          {initial}
        </S.AvatarStyled>
        <S.IdentityText>
          <S.Name id="manager-detail-name">{manager.name}</S.Name>
          <S.Email>{manager.email}</S.Email>
          <S.StatusBadge $active={isActive}>
            {isActive ? ManagerStatusEnum.ACTIVE : ManagerStatusEnum.INACTIVE}
          </S.StatusBadge>
        </S.IdentityText>
      </S.Identity>

      <S.Sections>
        <S.Section aria-labelledby="manager-detail-allocation">
          <S.SectionTitle id="manager-detail-allocation">
            Lotação
          </S.SectionTitle>
          <S.DetailList>
            <DetailItem icon={<StoreOutlined />} label="Loja">
              <LinkedValue
                name={manager.store_name}
                code={manager.store_code}
              />
            </DetailItem>
            <DetailItem icon={<PlaceOutlined />} label="Região">
              <LinkedValue
                name={manager.region_name}
                code={manager.region_code}
              />
            </DetailItem>
          </S.DetailList>
        </S.Section>

        <S.Section aria-labelledby="manager-detail-account">
          <S.SectionTitle id="manager-detail-account">Conta</S.SectionTitle>
          <S.DetailList>
            <DetailItem icon={<MailOutlined />} label="E-mail">
              {manager.email}
            </DetailItem>
            <DetailItem icon={<BadgeOutlined />} label="Cargo">
              {UserRoleLabel[manager.role] ?? 'Gerente'}
            </DetailItem>
          </S.DetailList>
        </S.Section>
      </S.Sections>
    </S.Card>
  )
}

const ManagerDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isEditOpen, setIsEditOpen] = useState(false)

  const managerId = id?.trim() ?? ''
  const hasValidId = managerId !== ''

  const { responseManager, isLoadingManager, errorManager } = useSendQuery<
    IManager,
    'Manager'
  >({
    queryKey: managerDetailQueryKey(managerId),
    apiPromise: (signal) => getManagerById(managerId, signal),
    suffix: 'Manager',
    options: { enabled: hasValidId },
  })

  // Saving invalidates the managers prefix, which also refreshes this detail.
  const handleSaveSuccess = useCallback(() => setIsEditOpen(false), [])
  const { managers, isSavingManager, saveManager } = useManagers({
    onSaveSuccess: handleSaveSuccess,
  })

  const handleSaveManager = (data: ISaveManagerData) => {
    if (responseManager) saveManager(data, responseManager)
  }

  const canEdit = hasValidId && !isLoadingManager && !!responseManager

  const renderFeedback = (title: string, message: string) => (
    <S.Feedback role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
    </S.Feedback>
  )

  const renderContent = () => {
    if (!hasValidId) {
      return renderFeedback(
        'Identificador do gerente não informado.',
        'Volte para a lista e escolha um gerente.',
      )
    }

    if (isLoadingManager) return <ManagerDetailSkeleton />

    if (errorManager || !responseManager) {
      return renderFeedback(
        'Não foi possível carregar o gerente.',
        'Verifique sua conexão e recarregue a página.',
      )
    }

    return <ManagerDetailCard manager={responseManager} />
  }

  return (
    <Page title={'Detalhes do gerente'}>
      <S.Wrapper>
        <S.Toolbar>
          <ButtonWithIcon
            variant="outlined"
            icon={<ArrowBack />}
            onClick={() => {
              void navigate('/gerentes')
            }}
          >
            Voltar
          </ButtonWithIcon>
          {canEdit && (
            <ButtonWithIcon
              variant="contained"
              icon={<EditOutlined />}
              onClick={() => setIsEditOpen(true)}
            >
              Editar
            </ButtonWithIcon>
          )}
        </S.Toolbar>

        {renderContent()}
      </S.Wrapper>

      <ManagerModal
        open={isEditOpen}
        type="edit"
        item={responseManager ?? null}
        managers={managers ?? []}
        isSaving={isSavingManager}
        onClose={() => setIsEditOpen(false)}
        onSave={handleSaveManager}
      />

      <LoadingMask isLoading={isSavingManager} />
    </Page>
  )
}

export default ManagerDetail
