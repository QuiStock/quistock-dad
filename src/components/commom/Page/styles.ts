import styled, { css } from 'styled-components'

import {
  Box,
  Avatar,
  Drawer,
  IconButton,
  MenuItem as ItemFloatMenu,
  Menu as FloatMenu,
  Link
} from '@mui/material'
import { Menu, NotificationsNone } from '@mui/icons-material'

export const TopBar = styled(Box)(
  ({ theme }) => css`
    && {
      width: 100vw;
      height: 8.8rem;
      background-color: #2D1B4E;
      padding: 1.6rem 0;
      position: fixed;
      top: 0;
      box-shadow: ${theme.boxShadow.main};
      display: flex;
      align-items: center;
      z-index: 1201;
    }
  `
)

export const BoxItens = styled('div')(
  ({ theme }) => css`
    gap: 2rem;
    display: flex;
    align-items: center;

    @media (max-width: ${theme.screen.small}) {
      gap: 1rem;
    }
  `
)

export const BoxTopBar = styled('div')(
  ({ theme }) => css`
    position: relative;
    display: flex;
    gap: 3rem;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${theme.screen.small}) {
      gap: 0;
    }
  `
)

export const FlagLessonType = styled('div')(
  ({ theme }) => css`
    width: fit-content;
    position: absolute;
    right: 0;
    top: 6.8rem;
    padding: 0.8rem 1.6rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.white};
    font-size: ${theme.font.size.pageTab};
    font-family: ${theme.font.family.base};
    text-align: center;
  `
)

export const MenuButton = styled(Menu)(
  ({ theme }) => css`
    && {
      cursor: pointer;
      font-size: ${theme.font.size.bigTitle};
      color: ${theme.colors.white};

      @media (max-width: ${theme.screen.small}) {
        font-size: ${theme.font.size.pageTab};
      }
    }
  `
)

export const Notifications = styled(NotificationsNone)(
  ({ theme }) => css`
    && {
      font-size: ${theme.font.size.bigTitle};
      margin-left: auto;
    }
  `
)

export const AvatarButton = styled(Avatar)(
  ({ theme }) => css`
    && {
      background-color: ${theme.colors.darkBlue};
      width: 4rem;
      height: 4rem;
      cursor: pointer;

      @media (max-width: ${theme.screen.small}) {
        width: 3rem;
        height: 3rem;
      }
    }
  `
)

export const MenuDrawer = styled(Drawer)(
  ({ theme }) => css`
    && {
      padding: 2rem 0;

      .MuiPaper-root {
        top: 8.8rem;
        background-color: #2D1B4E;
        padding: 1.6rem 0;
      }

      .MuiContainer-root {
        color: ${theme.colors.white};
        font-size: 1.6rem;
      }
    }
  `
)

export const MenuItem = styled('div')(
  ({ theme }) => css`
    display: flex;
    gap: 1rem;
    align-items: center;
    font-size: ${theme.font.size.body1};
    font-family: ${theme.font.family.base};
    font-weight: 500;
    cursor: pointer;
    color: ${theme.colors.white};

    svg {
      font-size: ${theme.font.size.body2};
    }
  `
)

export const Wrapper = styled('div')(
  () => css`
    && {
      padding-bottom: 4.8rem;
      width: 100%;
    }
  `
)

export const TitleTop = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      font-weight: 300;
      font-size: ${theme.font.size.subtitle};
      color: ${theme.font.colors.main};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;

      svg {
        font-size: ${theme.font.size.subtitle};
        color: ${theme.font.colors.main};
        margin-right: 2rem;
      }

      span {
        font-family: ${theme.font.family.base};
        font-weight: 300;
        font-size: ${theme.font.size.subtitle};
        color: ${theme.colors.lightBlue};
        margin-right: 1rem;
      }
    }
  `
)

export const CustomLink = styled(Link)(
  ({ theme }) => css`
    && {
      min-width: fit-content;
      display: flex;
      align-items: center;
      gap: 2rem;
      text-decoration: none;
      font-family: ${theme.font.family.base};
      font-weight: 700;
      font-size: ${theme.font.size.pageTab};
      color: ${theme.colors.white};
      padding: 0.8rem 1.6rem;

      cursor: pointer;

      span {
        font-weight: 300;
        font-size: ${theme.font.size.bigTitle};
      }

      @media (max-width: ${theme.screen.small}) {
        gap: 1rem;
        font-size: ${theme.font.size.base};

        span {
          font-size: ${theme.font.size.base};
        }
      }
    }
  `
)

export const MenuDivisor = styled('div')(
  ({ theme }) => css`
    width: 100%;
    margin-top: auto;
    border-bottom: solid 0.1rem ${theme.colors.white};
  `
)

export const StyledFloatMenu = styled(FloatMenu)(
  ({ theme }) => css`
    margin-top: 0.5rem;
    box-shadow: ${theme.boxShadow.main};
  `
)

export const StyledItemFloatMenu = styled(ItemFloatMenu)(
  ({ theme }) => css`
    && {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    svg {
      font-size: ${theme.font.size.body2};
      color: ${theme.colors.golden};
      transform: translateY(-0.2rem);
    }
  `
)

export const TextItemMenuFloat = styled('p')(
  ({ theme }) => css`
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.base};
    color: ${theme.font.colors.main};
    font-weight: 300;
  `
)

export const ButtonPrevPage = styled(IconButton)(
  () => css`
    && {
      margin-right: 1rem;
    }
  `
)

export const PageWrapper = styled('div')(
  () => css`
    width: 100%;
    height: 100%;
    padding: 2rem 0;
  `
)

export const LogoJBS = styled('img')(
  ({ theme }) => css`
    height: 2.4rem;
    width: auto;
    cursor: pointer;

    @media (max-width: ${theme.screen.small}) {
      height: 1.4rem;
    }
  `
)

export const StyledContainer = styled('div')(
  () => css`
    height: calc(100% - 9rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
    padding: 1.6rem;
  `
)
