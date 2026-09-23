import styled, { css } from 'styled-components'

import { ButtonComponent } from '@/components/commom/ButtonComponent'

interface StyledWrapperProps {
  height?: string
}

export const Wrapper = styled(ButtonComponent)<StyledWrapperProps>(
  ({ theme, height }) => css`
    && {
      height: ${height && height};
      svg {
        font-size: ${theme.font.size.pageTab};
      }
    }
  `,
)
