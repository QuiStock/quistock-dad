import styled, { css, keyframes } from 'styled-components'

import { Modal } from '@mui/material'

const surfaceIn = keyframes`
  from {
    transform: scale(0.96);
  }
  to {
    transform: scale(1);
  }
`

const SIZES = {
  sm: '48rem',
  md: '64rem',
}

export type TDialogSize = keyof typeof SIZES

export const StyledModal = styled(Modal)(
  ({ theme }) => css`
    && {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.6rem;
    }

    .MuiBackdrop-root {
      background-color: rgba(45, 27, 78, 0.48);
    }

    @media (max-width: ${theme.screen.xsmall}) {
      && {
        padding: 0.8rem;
      }
    }
  `,
)

// Modals stay centred, so the scale runs from the centre (no trigger origin).
export const Surface = styled('div')<{ $size: TDialogSize }>(
  ({ theme, $size }) => css`
    position: relative;
    width: 100%;
    max-width: ${SIZES[$size]};
    max-height: calc(100dvh - 3.2rem);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.floating};
    font-family: ${theme.font.family.base};
    outline: none;
    animation: ${surfaceIn} ${theme.motion.enter} ${theme.motion.easeOut};

    @media (max-width: ${theme.screen.small}) {
      padding: 2.4rem;
      gap: 2rem;
    }
  `,
)

export const Header = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
)

export const Title = styled('h2')<{ $tone?: 'default' | 'danger' }>(
  ({ theme, $tone = 'default' }) => css`
    margin: 0;
    font-size: ${theme.font.size.title};
    font-weight: 500;
    line-height: 1.2;
    color: ${$tone === 'danger' ? theme.font.colors.error : theme.font.colors.title};
  `,
)

export const Description = styled('p')(
  ({ theme }) => css`
    margin: 0;
    font-size: ${theme.font.size.body1};
    font-weight: 300;
    line-height: 1.5;
    color: ${theme.font.colors.main};
  `,
)

export const Body = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
)

export const Actions = styled('div')(
  ({ theme }) => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1.2rem;
    margin-top: 0.8rem;

    @media (max-width: ${theme.screen.xsmall}) {
      flex-direction: column-reverse;
      align-items: stretch;
    }
  `,
)
