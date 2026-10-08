import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import * as S from './styles'
import { IconsComponent } from '@/components/commom/IconsComponent'

import Skeleton from '@mui/material/Skeleton'
import QuestionMarkOutlinedIcon from '@mui/icons-material/QuestionMarkOutlined'
import { useNavigate } from 'react-router-dom'

export const ProfilePartial = () => {
  const navigate = useNavigate()

  const mockProfileData = [
    {
      id: 1,
      name: 'Paulo Santos',
      email: 'paulo.santos@gmail.com',
      photoUrl: '',
    },
  ]

  const profileData = mockProfileData
  const user = profileData[0]

  return (
    <S.Wrapper>
      {profileData.length === 0 ? (
        <IconsComponent type="Empty">
          <p>{'Nenhum perfil encontrado'}</p>
        </IconsComponent>
      ) : (
        <>
          <S.Profile>
            {user ? (
              <S.AvatarStyled
                src={
                  user.photoUrl
                    ? user.photoUrl
                    : '/images/image-course-fallback.png'
                }
                alt="Imagem de perfil"
              >
                {user.name ? user.name[0].toUpperCase() : 'Sem Nome'}
              </S.AvatarStyled>
            ) : (
              <Skeleton
                animation="pulse"
                variant="circular"
                height="10rem"
                width="10rem"
              />
            )}
          </S.Profile>

          <S.PersonalInformation>
            <h1>Informações pessoais</h1>
            <p>
              <span>Nome: </span>
              {user?.name || '-'}
            </p>
            <p>
              <span>Email: </span>
              {user?.email || '-'}
            </p>
          </S.PersonalInformation>

          <ButtonWithIcon
            icon={<QuestionMarkOutlinedIcon />}
            variant="contained"
            onClick={() => void navigate('/contato')}
          >
            Dúvidas sobre o QuiStock?
          </ButtonWithIcon>
        </>
      )}
    </S.Wrapper>
  )
}
