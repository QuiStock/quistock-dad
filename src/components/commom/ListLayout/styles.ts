import styled, { css } from 'styled-components'

// Shared frame for list screens (stores, managers): filters above, table below.

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
)

export const BoxFilters = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1.6rem;

    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
      align-items: stretch;
    }
  `,
)

export const FilterInputs = styled('div')(
  () => css`
    flex: 1;
    min-width: 0;
  `,
)

export const SectionHeader = styled('div')(
  () => css`
    width: 100%;
    min-height: 4.4rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.6rem;
  `,
)
