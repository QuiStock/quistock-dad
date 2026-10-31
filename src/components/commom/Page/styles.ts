import { createElement } from 'react'
import styled, { css } from 'styled-components'

import {
  Box,
  Avatar,
  ButtonBase,
  Drawer,
  IconButton,
  MenuItem as ItemFloatMenu,
  Menu as FloatMenu,
  Link,
  type LinkProps,
} from '@mui/material'
import { NavLink as RouterLink } from 'react-router-dom'
import { Menu } from '@mui/icons-material'

export const TopBar = styled(Box)(
  ({ theme }) => css`
    && {
      width: 100vw;
      height: 8.8rem;
      background-color: ${theme.colors.brandDeep};
      padding: 1.6rem 0;
      position: fixed;
      top: 0;
      box-shadow: ${theme.boxShadow.main};
      display: flex;
      align-items: center;
      z-index: 1201;
    }
  `,
)

export const BoxItens = styled('div')(
  ({ theme }) => css`
    gap: 2rem;
    display: flex;
    align-items: center;

    @media (max-width: ${theme.screen.small}) {
      gap: 1rem;
    }
  `,
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
  `,
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
  `,
)

export const IconTrigger = styled(ButtonBase)(
  ({ theme }) => css`
    && {
      padding: 0;
      border-radius: 50%;
      transition: transform ${theme.motion.press} ${theme.motion.easeOut};

      &:active {
        transform: scale(0.95);
      }
    }
  `,
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
  `,
)

export const AvatarButton = styled(Avatar)(
  ({ theme }) => css`
    && {
      background-color: ${theme.colors.brandAvatar};
      width: 4rem;
      height: 4rem;
      cursor: pointer;
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.body1};
      font-weight: 500;
      transition: background-color ${theme.motion.hover} ease;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: ${theme.colors.brandAvatarHover};
        }
      }

      @media (max-width: ${theme.screen.small}) {
        width: 3rem;
        height: 3rem;
      }
    }
  `,
)

export const MenuDrawer = styled(Drawer)(
  ({ theme }) => css`
    && {
      padding: 2rem 0;

      .MuiPaper-root {
        top: 8.8rem;
        min-width: 24rem;
        background-color: ${theme.colors.brandDeep};
        padding: 1.6rem 0;
      }

      .MuiContainer-root {
        color: ${theme.colors.white};
        font-size: 1.6rem;
      }
    }
  `,
)

export const MenuItem = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-size: ${theme.font.size.body1};
    font-family: ${theme.font.family.base};
    font-weight: 500;
    cursor: pointer;
    color: ${theme.colors.white};

    svg {
      font-size: ${theme.font.size.pageTab};
      color: ${theme.colors.brandOnDeep};
    }
  `,
)

export const Wrapper = styled('div')(
  ({ theme }) => css`
    && {
      width: 100%;
      min-height: calc(100vh - 8.8rem);
      display: flex;
      flex-direction: column;
      padding-bottom: 4.8rem;
      background-color: ${theme.colors.white};
    }
  `,
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
  `,
)

const RouterMuiLink = (props: LinkProps & { to: string }) =>
  createElement(Link, { component: RouterLink, ...props })

export const CustomLink = styled(RouterMuiLink)(
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
  `,
)

export const MenuDivisor = styled('div')(
  ({ theme }) => css`
    width: 100%;
    margin-top: auto;
    border-bottom: solid 0.1rem ${theme.colors.white};
  `,
)

export const StyledFloatMenu = styled(FloatMenu)(
  ({ theme }) => css`
    margin-top: 0.5rem;
    box-shadow: ${theme.boxShadow.main};
  `,
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
      color: ${theme.colors.darkBlue};
      transform: translateY(-0.2rem);
    }
  `,
)

export const TextItemMenuFloat = styled('p')(
  ({ theme }) => css`
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.base};
    color: ${theme.font.colors.main};
    font-weight: 300;
  `,
)

export const ButtonPrevPage = styled(IconButton)(
  () => css`
    && {
      margin-right: 1rem;
    }
  `,
)

export const PageWrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: 100%;
    padding: 3.2rem 0 1.6rem;

    @media (max-width: ${theme.screen.small}) {
      padding: 2.4rem 0 0.8rem;
    }
  `,
)

export const LogoJBS = styled('img')(
  ({ theme }) => css`
    height: 2.4rem;
    width: auto;
    cursor: pointer;

    @media (max-width: ${theme.screen.small}) {
      height: 1.4rem;
    }
  `,
)

export const Navigation = styled('nav')(
  ({ theme }) => css`
    height: calc(100% - 9rem);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
    padding: 0.8rem;

    > a {
      width: 100%;
      border-radius: ${theme.borderRadius.main};
      transition:
        background-color ${theme.motion.hover} ease,
        transform ${theme.motion.press} ${theme.motion.easeOut};

      &:active {
        transform: scale(0.98);
      }

      &[aria-current='page'] {
        background-color: rgba(255, 255, 255, 0.12);
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      }
    }
  `,
)

export const SkipLink = styled('a')(
  ({ theme }) => css`
    position: absolute;
    left: 1.6rem;
    top: -10rem;
    z-index: 2000;
    padding: 0.8rem 1.6rem;
    background-color: ${theme.colors.white};
    color: ${theme.font.colors.title};
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.body1};

    &:focus {
      top: 1rem;
    }
  `,
)

export const Footer = styled('footer')(
  ({ theme }) => css`
    width: 100%;
    padding: 1.6rem;
    text-align: center;
    background-color: ${theme.colors.brandDeep};

    small {
      color: ${theme.colors.white};
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.base};
    }
  `,
)
