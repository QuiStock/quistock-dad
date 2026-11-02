import styled, { css } from 'styled-components'

import { Tabs } from '@mui/material'

export const CustomTabs = styled(Tabs)(
  ({ theme }) => css`
    && {
      min-height: 0;
      border-bottom: none;

      .MuiTabs-flexContainer {
        gap: 3.2rem;
      }

      .MuiTabs-indicator {
        height: 0.3rem;
        border-radius: 0.3rem 0.3rem 0 0;
        background-color: ${theme.colors.tabsIndicator};
        transition:
          left ${theme.motion.enter} ${theme.motion.easeOut},
          width ${theme.motion.enter} ${theme.motion.easeOut};
      }
    }
  `,
)

export const CustomTabPanel = styled('div')(
  () => css`
    position: relative;
    padding: 2.4rem 0 0;
  `,
)

export const WrapperTabs = styled('div')(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1.6rem;
  `,
)
