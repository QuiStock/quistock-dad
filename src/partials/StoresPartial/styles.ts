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

export const ModalWrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    gap: 1.8rem;
    padding: 2.4rem;
  `,
)

export const ModalTitle = styled('p')(
  ({ theme }) => css`
    font-family: ${theme.font.family.base};
    color: ${theme.font.colors.title};
    font-size: ${theme.font.size.title};
    font-weight: 700;
    margin-bottom: 2rem;
  `,
)
