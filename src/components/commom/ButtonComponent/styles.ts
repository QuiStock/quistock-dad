import styled, { css } from 'styled-components'
import { Button, type IconButtonProps } from '@mui/material'

export const Wrapper = styled(Button)<IconButtonProps>(
  ({ theme, variant }) => css`
    && {
      border-radius: ${theme.borderRadius.main};
      font-size: ${theme.font.size.medium};
      font-family: ${theme.font.family.base};
      font-weight: 500;
      min-width: fit-content;

      display: flex;
      align-items: center;

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
          &:disabled {
            background-color: rgba(0, 0, 0, 0.12);
          }
          &:hover {
            background-color: ${theme.colors.darkBlue};
          }
        `
      }

      ${
        variant === 'outlined' &&
        css`
          border: 0.1rem solid ${theme.colors.lightBlue};
          color: ${theme.colors.lightBlue};
          &:disabled {
            color: rgba(0, 0, 0, 0.26);
            border: 0.1rem solid rgba(0, 0, 0, 0.12);
          }
          &:hover {
            background-color: rgba(0, 90, 190, 0.1);
          }
        `
      }
    }
  `,
)
