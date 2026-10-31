import styled, { css } from 'styled-components'
import { Button, type IconButtonProps } from '@mui/material'

export const Wrapper = styled(Button)<IconButtonProps>(
  ({ theme, variant }) => css`
    && {
      min-width: fit-content;
      min-height: 3.6rem;
      padding: 0.6rem 1.6rem;
      display: flex;
      align-items: center;
      border-radius: ${theme.borderRadius.main};
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.base};
      font-weight: 500;
      text-transform: none;
      letter-spacing: 0;
      box-shadow: none;
      transition:
        transform ${theme.motion.press} ${theme.motion.easeOut},
        background-color ${theme.motion.hover} ease,
        border-color ${theme.motion.hover} ease,
        color ${theme.motion.hover} ease;

      &:active:not(:disabled) {
        transform: scale(0.98);
      }

      p {
        margin: auto;
        font-size: ${theme.font.size.base};
      }

      a {
        color: ${theme.colors.white};
        text-decoration: none;
      }

      ${
        variant === 'contained' &&
        css`
          background-color: ${theme.colors.lightBlue};
          color: ${theme.colors.white};

          &:disabled {
            background-color: ${theme.colors.lightGray3};
            color: ${theme.colors.lightGray4};
          }

          @media (hover: hover) and (pointer: fine) {
            &:hover:not(:disabled) {
              background-color: ${theme.colors.brandPrimary};
              box-shadow: none;
            }
          }
        `
      }

      ${
        variant === 'outlined' &&
        css`
          border: 0.1rem solid ${theme.colors.lightBlue};
          color: ${theme.colors.lightBlue};

          &:disabled {
            color: ${theme.colors.lightGray4};
            border-color: ${theme.colors.lightGray3};
          }

          @media (hover: hover) and (pointer: fine) {
            &:hover:not(:disabled) {
              background-color: ${theme.colors.brandTint};
            }
          }
        `
      }
    }
  `,
)
