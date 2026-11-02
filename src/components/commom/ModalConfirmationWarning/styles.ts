import styled, { css } from 'styled-components'

export const ConfirmationBox = styled('label')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-left: -0.9rem;
    cursor: pointer;
    font-family: ${theme.font.family.base};
  `,
)

export const ConfirmationText = styled('span')(
  ({ theme }) => css`
    font-size: ${theme.font.size.body1};
    font-weight: 400;
    color: ${theme.font.colors.title2};
  `,
)
