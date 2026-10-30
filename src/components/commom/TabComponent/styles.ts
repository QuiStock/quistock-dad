import styled, { css } from 'styled-components'

import { Tab, type TabProps } from '@mui/material'

export const Wrapper = styled(Tab)<TabProps>(
  ({ theme, disabled }) => css`
    && {
      max-width: fit-content;
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.subtitle};
      color: ${theme.font.colors.main};
      font-weight: 500;
      text-transform: uppercase;

      &.Mui-selected {
        color: ${theme.colors.lightBlue};
      }

      ${
        disabled &&
        css`
          color: ${theme.colors.gray300}; /* desabilitado: isento de contraste (WCAG 1.4.3) */
          pointer-events: none;
        `
      }
    }
  `,
)
