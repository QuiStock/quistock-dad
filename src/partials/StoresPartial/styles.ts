import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  `,
)

export const BoxFilters = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
    }
  `,
)

export const BoxButtons = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    svg {
      font-size: ${theme.font.size.pageTab};
    }
  `,
)

export const FilterInputs = styled('div')(
  ({ theme }) => css`
    flex: 1;

    @media (max-width: ${theme.screen.small}) {
      width: 100%;
    }
  `,
)

export const SeeMoreStoresButton = styled('div')(
  () => css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  `,
)
