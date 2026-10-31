import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.4rem;

    @media (max-width: ${theme.screen.medium}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const Column = styled('section')(
  () => css`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
)

export const Header = styled('div')(
  () => css`
    width: 100%;
    min-height: 4.4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1.6rem;
  `,
)

export const Content = styled('div')(
  () => css`
    width: 100%;
    flex: 1;
    display: flex;
  `,
)

export const CardContainer = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.6rem;
    padding: 2.4rem 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};

    @media (max-width: ${theme.screen.small}) {
      padding: 2.4rem;
    }
  `,
)

export const MiniKpisGrid = styled('ul')(
  ({ theme }) => css`
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.6rem;

    @media (max-width: ${theme.screen.xsmall}) {
      gap: 1.2rem;
    }
  `,
)
