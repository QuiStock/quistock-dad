import styled, { css } from 'styled-components'

import { Tab, type TabProps } from '@mui/material'

export const Wrapper = styled(Tab)<TabProps>(
  ({ theme, disabled }) => css`
    && {
      max-width: fit-content;
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.subtitle};
      color: ${theme.colors.lightBlue};
      font-weight: 500;
      text-transform: uppercase;
      opacity: 0.5;

      &.Mui-selected {
        opacity: 1;
      }

      ${
        disabled &&
        css`
          color: ${theme.colors.gray300};
          pointer-events: none;
        `
      }
    }
  `,
)
