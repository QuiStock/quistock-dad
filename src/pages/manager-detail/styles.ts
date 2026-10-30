import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.8rem;
  `,
)

export const DetailList = styled('dl')(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 1rem 2rem;
    margin: 0;
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.base};

    @media (max-width: ${theme.screen.small}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const DetailLabel = styled('dt')(
  ({ theme }) => css`
    font-weight: 600;
    color: ${theme.font.colors.dark};
  `,
)

export const DetailValue = styled('dd')(
  ({ theme }) => css`
    margin: 0;
    color: ${theme.font.colors.main};
  `,
)

export const ErrorMessage = styled('p')(
  ({ theme }) => css`
    margin: 0;
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.body1};
    color: ${theme.font.colors.error};
  `,
)
