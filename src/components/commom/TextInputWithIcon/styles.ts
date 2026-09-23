import styled, { css } from 'styled-components'

import { TextField } from '@mui/material'

export const Wrapper = styled(TextField)(
  ({ theme, disabled }) => css`
    && {
      width: 100%;

      label,
      input {
        font-size: ${theme.font.size.body1};
        font-family: ${theme.font.family.base};
        ${
          !disabled &&
          css`
            color: ${theme.font.colors.main};
          `
        }
      }

      svg {
        font-size: ${theme.font.size.title};
        ${
          disabled &&
          css`
            color: rgba(0, 0, 0, 0.26);
          `
        }
      }
    }
  `,
)
