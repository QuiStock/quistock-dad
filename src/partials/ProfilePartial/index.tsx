import {
  BadgeOutlined,
  MailOutlined,
  PlaceOutlined,
  QuestionMarkOutlined,
  StoreOutlined,
} from '@mui/icons-material'
import Skeleton from '@mui/material/Skeleton'
import { useNavigate } from 'react-router-dom'

import * as S from './styles'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { DetailItem } from '@/components/commom/DetailCard'
import { IconsComponent } from '@/components/commom/IconsComponent'
import { useProfile } from '@/hooks/useProfile'
import { ManagerStatusEnum, UserRoleLabel } from '@/types/enums'
import type { IProfile } from '@/types'

const NOT_LINKED = 'Não vinculada'

const LinkedValue = ({
  name,
  code,
}: {
  name: string | null
  code: string | null
}) => (
  <>
    {name ?? NOT_LINKED}
    {name && code && <small>{`Código ${code}`}</small>}
  </>
)

const ProfileSkeleton = () => (
  <S.Card aria-busy="true" aria-label="Carregando perfil">
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

const ProfileCard = ({ user }: { user: IProfile }) => {
  const isActive = user.status === 'ACTIVE'
  const initial = user.name?.[0]?.toUpperCase() ?? '?'
  const roleLabel = UserRoleLabel[user.role] || user.role

  return (
    <S.Card aria-labelledby="profile-name">
      <S.Identity>
        <S.AvatarStyled src={user.profile_photo_url ?? undefined} alt="">
          {initial}
        </S.AvatarStyled>
        <S.IdentityText>
          <S.Name id="profile-name">{user.name || '-'}</S.Name>
          <S.Subtitle>{roleLabel}</S.Subtitle>
          <S.StatusBadge $active={isActive}>
            {isActive ? ManagerStatusEnum.ACTIVE : ManagerStatusEnum.INACTIVE}
          </S.StatusBadge>
        </S.IdentityText>
      </S.Identity>

      <S.Sections>
        <S.Section aria-labelledby="profile-account">
          <S.SectionTitle id="profile-account">Conta</S.SectionTitle>
          <S.DetailList>
            <DetailItem icon={<MailOutlined />} label="E-mail">
              {user.email || '-'}
            </DetailItem>
            <DetailItem icon={<BadgeOutlined />} label="Cargo">
              {roleLabel}
            </DetailItem>
          </S.DetailList>
        </S.Section>

        <S.Section aria-labelledby="profile-allocation">
          <S.SectionTitle id="profile-allocation">Lotação</S.SectionTitle>
          <S.DetailList>
            <DetailItem icon={<StoreOutlined />} label="Loja">
              <LinkedValue name={user.store_name} code={user.store_code} />
            </DetailItem>
            <DetailItem icon={<PlaceOutlined />} label="Região">
              <LinkedValue name={user.region_name} code={user.region_code} />
            </DetailItem>
          </S.DetailList>
        </S.Section>
      </S.Sections>
    </S.Card>
  )
}

export const ProfilePartial = () => {
  const navigate = useNavigate()

  const { profile: user, isLoadingProfile } = useProfile()

  const renderContent = () => {
    if (isLoadingProfile) return <ProfileSkeleton />

    if (!user) {
      return (
        <IconsComponent type="Empty">
          <p>{'Nenhum perfil encontrado'}</p>
        </IconsComponent>
      )
    }

    return <ProfileCard user={user} />
  }

  return (
    <S.Wrapper>
      {renderContent()}

      <S.Actions>
        <ButtonWithIcon
          icon={<QuestionMarkOutlined />}
          variant="outlined"
          onClick={() => void navigate('/contato')}
        >
          Dúvidas sobre o QuiStock?
        </ButtonWithIcon>
      </S.Actions>
    </S.Wrapper>
  )
}
