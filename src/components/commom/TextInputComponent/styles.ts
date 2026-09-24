import { TextField } from '@mui/material'
import styled, { css } from 'styled-components'

export const TextInput = styled(TextField)(
  ({ theme }) => css`
    && {
      input,
      label {
        font-size: ${theme.font.size.body1};
      }
    }
  `,
)
