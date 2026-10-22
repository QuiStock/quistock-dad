import { type ReactNode, useState, type MouseEvent } from 'react'
import * as S from './styles'

import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import { Container } from '@mui/material'
import { HouseOutlined, PersonOutlined, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useProfile } from '@/hooks/useProfile'
import { canManageManagers } from '@/utils/permissions'

interface IPage {
  children: ReactNode
  title: string
}

const Page = ({ children, title }: IPage) => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { profile } = useProfile()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleClickDetails = () => {
    handleCloseUserMenu()
    void navigate('/perfil')
  }

  const handleClickLogout = async () => {
    handleCloseUserMenu()
    await logout()
    void navigate('/login')
  }

  const handleClickMenuButton = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <title>{`QuiStock | ${title}`}</title>
      <header>
        <S.TopBar>
          <Container maxWidth="xl">
            <S.BoxTopBar>
              <S.BoxItens>
                <S.IconTrigger
                  disableRipple
                  id="navigation-menu-trigger"
                  aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                  aria-controls="main-navigation"
                  aria-expanded={isMenuOpen}
                  onClick={handleClickMenuButton}
                >
                  <S.MenuButton />
                </S.IconTrigger>

                <S.CustomLink to={'/home'}>
                  <S.LogoJBS
                    src="src/assets/quistock.svg"
                    alt="Logo QuiStock"
                  />
                  <span>|</span>
                  {'Admin'}
                </S.CustomLink>
              </S.BoxItens>

              <S.BoxItens>
                <S.IconTrigger
                  disableRipple
                  id="user-menu-trigger"
                  aria-label="Abrir menu do usuário"
                  aria-haspopup="menu"
                  aria-controls="user-menu"
                  aria-expanded={Boolean(anchorElUser)}
                  onClick={handleOpenUserMenu}
                >
                  <S.AvatarButton>{'Q'}</S.AvatarButton>
                </S.IconTrigger>
                <S.StyledFloatMenu
                  id="user-menu"
                  open={Boolean(anchorElUser)}
                  anchorEl={anchorElUser}
                  slotProps={{
                    root: { keepMounted: true },
                    list: { 'aria-labelledby': 'user-menu-trigger' },
                  }}
                  onClose={handleCloseUserMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <S.StyledItemFloatMenu onClick={handleClickDetails}>
                    <PersonOutlined />
                    <S.TextItemMenuFloat>Detalhes</S.TextItemMenuFloat>
                  </S.StyledItemFloatMenu>

                  <S.StyledItemFloatMenu
                    onClick={() => void handleClickLogout()}
                  >
                    <Logout />
                    <S.TextItemMenuFloat>Sair</S.TextItemMenuFloat>
                  </S.StyledItemFloatMenu>
                </S.StyledFloatMenu>
              </S.BoxItens>
            </S.BoxTopBar>
          </Container>

          <S.MenuDrawer
            anchor="left"
            open={isMenuOpen}
            onClose={handleClickMenuButton}
            ModalProps={{ keepMounted: true }}
          >
            <S.Navigation id="main-navigation" aria-label="Navegação principal">
              <S.CustomLink to={'/home'}>
                <S.MenuItem>
                  <HouseOutlined /> {'Home'}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink to={'/dashboards'}>
                <S.MenuItem>
                  <InsertChartOutlinedOutlinedIcon /> {'Dashboards'}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink to={'/lojas'}>
                <S.MenuItem>
                  <StoreOutlinedIcon /> {'Lojas'}
                </S.MenuItem>
              </S.CustomLink>

              {canManageManagers(profile?.role) && (
                <S.CustomLink to={'/gerentes'}>
                  <S.MenuItem>
                    <PeopleAltOutlinedIcon /> {'Gerentes'}
                  </S.MenuItem>
                </S.CustomLink>
              )}
            </S.Navigation>
          </S.MenuDrawer>
        </S.TopBar>
      </header>

      <main>
        <S.Wrapper>
          <Container maxWidth="xl" style={{ backgroundColor: 'white' }}>
            <S.PageWrapper>{children}</S.PageWrapper>
          </Container>
        </S.Wrapper>
      </main>
    </>
  )
}

export { Page }
