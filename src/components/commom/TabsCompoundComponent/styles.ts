import styled, { css } from 'styled-components'

import { Tabs } from '@mui/material'

export const CustomTabs = styled(Tabs)(
  ({ theme }) => css`
    && {
      border-bottom: none;

      .MuiTabs-indicator {
        background-color: ${theme.colors.tabsIndicator};
        height: 0.3rem;
      }
    }
  `,
)

export const CustomTabPanel = styled('div')(
  () => css`
    position: relative;
    padding: 2rem 0;
  `,
)

export const WrapperTabs = styled('div')(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 2.4rem 0;
    gap: 2.4rem;
  `,
)
