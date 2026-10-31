import styled, { css } from 'styled-components'

import { Tab, type TabProps } from '@mui/material'

export const Wrapper = styled(Tab)<TabProps>(
  ({ theme, disabled }) => css`
    && {
      min-width: 0;
      min-height: 4.4rem;
      max-width: fit-content;
      padding: 0 0 0.8rem;
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.pageTab};
      font-weight: 400;
      line-height: 1.2;
      color: ${theme.font.colors.main};
      opacity: 1;
      text-transform: none;
      letter-spacing: 0;
      transition: color ${theme.motion.hover} ease;

      /* The compound Tab is not a direct child of Tabs, so MUI never adds
         .Mui-selected; aria-selected is the reliable signal. */
      &.Mui-selected,
      &[aria-selected='true'] {
        color: ${theme.font.colors.title};
        font-weight: 500;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover:not([aria-selected='true']) {
          color: ${theme.font.colors.title};
        }
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
