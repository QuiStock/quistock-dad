import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import * as S from './styles'
import { IconsComponent } from '@/components/commom/IconsComponent'

import Skeleton from '@mui/material/Skeleton'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import { useNavigate } from 'react-router-dom'
import { useSendQuery } from '@/hooks/useSendQuery'
import { getProfile, PROFILE_QUERY_KEY } from '@/services/api-profile'
import { UserRoleLabel } from '@/types/enums'
import type { IProfile } from '@/types'

export const ProfilePartial = () => {
  const navigate = useNavigate()

  const { responseProfile: user, isLoadingProfile } = useSendQuery<
    IProfile,
    'Profile'
  >({
    queryKey: PROFILE_QUERY_KEY,
    apiPromise: getProfile,
    suffix: 'Profile',
  })

  if (isLoadingProfile) {
    return (
      <S.Wrapper>
        <S.Profile>
          <Skeleton
            animation="pulse"
            variant="circular"
            height="12.4rem"
            width="12.4rem"
          />
        </S.Profile>
        <S.PersonalInformation>
          <Skeleton variant="text" width="60%" height={32} />
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="70%" height={24} />
          <Skeleton variant="text" width="50%" height={24} />
        </S.PersonalInformation>
      </S.Wrapper>
    )
  }

  if (!user) {
    return (
      <S.Wrapper>
        <IconsComponent type="Empty">
          <p>{'Nenhum perfil encontrado'}</p>
        </IconsComponent>
      </S.Wrapper>
    )
  }

  const avatarUrl =
    user.profile_photo_url || '/images/image-course-fallback.png'
  const avatarLetter = user.name ? user.name[0].toUpperCase() : 'Sem Nome'
  const roleLabel = UserRoleLabel[user.role] || user.role

  return (
    <S.Wrapper>
      <S.Profile>
        <S.AvatarStyled src={avatarUrl} alt="Imagem de perfil">
          {avatarLetter}
        </S.AvatarStyled>
      </S.Profile>

      <S.PersonalInformation>
        <h1>Informações pessoais</h1>
        <p>
          <span>Nome: </span>
          {user.name || '-'}
        </p>
        <p>
          <span>Email: </span>
          {user.email || '-'}
        </p>
        <p>
          <span>Cargo: </span>
          {roleLabel}
        </p>
        {user.store_name && (
          <p>
            <span>Loja: </span>
            {user.store_name}
          </p>
        )}
        {user.region_name && (
          <p>
            <span>Região: </span>
            {user.region_name}
          </p>
        )}
      </S.PersonalInformation>

      <ButtonWithIcon
        icon={<QuestionMarkOutlinedIcon />}
        variant="contained"
        onClick={() => void navigate('/contato')}
      >
        Dúvidas sobre o QuiStock?
      </ButtonWithIcon>
    </S.Wrapper>
  )
}
