import { type ReactNode, useState, type MouseEvent } from 'react'
import * as S from './styles'

import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined'
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import { Container } from '@mui/material'
import { HouseOutlined, PersonOutlined, Logout } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

interface IPage {
  children: ReactNode
  title: string
}

const Page = ({ children, title }: IPage) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handleClickLogout = () => {
    handleCloseUserMenu()
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
                <S.MenuButton onClick={handleClickMenuButton} />

                <S.CustomLink href={'/home'}>
                  <S.LogoJBS
                    src="src/assets/quistock.svg"
                    alt="Logo QuiStock"
                  />
                  <span>|</span>
                  {'Admin'}
                </S.CustomLink>
              </S.BoxItens>

              <S.BoxItens>
                <S.AvatarButton onClick={handleOpenUserMenu}>
                  {'Q'}
                </S.AvatarButton>
                <S.StyledFloatMenu
                  open={Boolean(anchorElUser)}
                  anchorEl={anchorElUser}
                  onClose={handleCloseUserMenu}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <S.StyledItemFloatMenu onClick={handleClickDetails}>
                    <PersonOutlined />
                    <S.TextItemMenuFloat>Detalhes</S.TextItemMenuFloat>
                  </S.StyledItemFloatMenu>

                  <S.StyledItemFloatMenu onClick={handleClickLogout}>
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
          >
            <S.StyledContainer>
              <S.CustomLink href={'/home'}>
                <S.MenuItem>
                  <HouseOutlined /> {'Home'}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink href={'/dashboards'}>
                <S.MenuItem>
                  <InsertChartOutlinedOutlinedIcon /> {'Dashboards'}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink href={'/lojas'}>
                <S.MenuItem>
                  <StoreOutlinedIcon /> {'Lojas'}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink href={'/gerentes'}>
                <S.MenuItem>
                  <PeopleAltOutlinedIcon /> {'Gerentes'}
                </S.MenuItem>
              </S.CustomLink>
            </S.StyledContainer>
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
