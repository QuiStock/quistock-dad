import { type ReactNode, useMemo, useState } from 'react'
import * as S from './styles'

import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import AssistantOutlinedIcon from '@mui/icons-material/AssistantOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { Container } from '@mui/material'
import {
  HouseOutlined,
} from '@mui/icons-material'

interface IPage {
  children: ReactNode
  title: string
}

const Page = ({
  children,
  title,
}: IPage) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const open = useMemo(() => !!anchorEl, [anchorEl])

  const handleClickUserAvatar = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClickMenuButton = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <title>
        {`Quistock | ${title}`}
      </title>
      <header>
        <S.TopBar>
          <Container maxWidth="xl">
            <S.BoxTopBar>
              <S.BoxItens>
                <S.MenuButton onClick={handleClickMenuButton} />

                <S.CustomLink href={'/'}>
                  <S.LogoJBS
                    src="src/assets/quistock.svg"
                    alt="Logo Quistock"
                  />
                  <span>|</span>
                  {"Admin"}
                </S.CustomLink>
              </S.BoxItens>

              <S.BoxItens>
                <S.AvatarButton onClick={handleClickUserAvatar}>
                  {"Q"}
                </S.AvatarButton>
              </S.BoxItens>
            </S.BoxTopBar>
          </Container>

          <S.MenuDrawer
            anchor="left"
            open={isMenuOpen}
            onClose={handleClickMenuButton}
          >
            <S.StyledContainer>
              <S.CustomLink href={'/'}>
                <S.MenuItem>
                  <HouseOutlined /> {"Home"}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink href={'/funcionarios'}>
                <S.MenuItem>
                  <PeopleAltOutlinedIcon /> {"Funcionários"}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink href={'/dashboards'}>
                <S.MenuItem>
                  <InsertChartOutlinedOutlinedIcon /> {"Dashboards"}
                </S.MenuItem>
              </S.CustomLink>

              <S.CustomLink href={'/fefo'}>
                <S.MenuItem>
                  <AssistantOutlinedIcon /> {"FEFO"}
                </S.MenuItem>
              </S.CustomLink>
            </S.StyledContainer>
          </S.MenuDrawer>
        </S.TopBar>
      </header >

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
