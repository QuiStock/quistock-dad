import styled, { css } from 'styled-components'
import { MenuItem as ItemFloatMenu } from '@mui/material'

export const StyledItemFloatMenu = styled(ItemFloatMenu)(
  ({ theme }) => css`
    && {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    svg {
      font-size: ${theme.font.size.body2};
      color: ${theme.colors.darkBlue};
      transform: translateY(-0.2rem);
    }
  `,
)

export const TextItemMenuFloat = styled('p')(
  ({ theme }) => css`
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.base};
    color: ${theme.font.colors.main};
    font-weight: 300;
  `,
)
