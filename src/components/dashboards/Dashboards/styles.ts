import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4.8rem;

    @media (max-width: ${theme.screen.small}) {
      gap: 3.2rem;
    }
  `,
)

export const Section = styled('section')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  `,
)

export const Header = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  `,
)

export const Content = styled('div')(
  () => css`
    width: 100%;
  `,
)

export const KpiGrid = styled('ul')(
  ({ theme }) => css`
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.6rem;

    @media (max-width: ${theme.screen.medium}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: ${theme.screen.xsmall}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const KpiCard = styled('li')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 2.4rem;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    font-family: ${theme.font.family.base};
  `,
)

// The semantic colour lives in a status dot, so the number keeps full contrast.
export const KpiCardHeader = styled('span')<{ $accent: string }>(
  ({ theme, $accent }) => css`
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    font-size: ${theme.font.size.base};
    font-weight: 400;
    color: ${theme.font.colors.title2};

    &::before {
      content: '';
      width: 0.8rem;
      height: 0.8rem;
      flex-shrink: 0;
      border-radius: 50%;
      background-color: ${$accent};
    }
  `,
)

export const KpiValue = styled('strong')(
  ({ theme }) => css`
    font-size: ${theme.font.size.bigTitle};
    font-weight: 500;
    line-height: 1.1;
    color: ${theme.colors.brandInk};
    font-variant-numeric: tabular-nums;
  `,
)

export const KpiDescription = styled('span')(
  ({ theme }) => css`
    font-size: ${theme.font.size.base};
    font-weight: 300;
    color: ${theme.font.colors.main};
  `,
)

export const ChartsContainer = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 2.4rem;

    @media (max-width: ${theme.screen.medium}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const ChartCard = styled('article')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 2.4rem 3.2rem 3.2rem;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};

    @media (max-width: ${theme.screen.small}) {
      padding: 2.4rem;
    }
  `,
)

export const ChartTitle = styled('h3')(
  ({ theme }) => css`
    margin: 0;
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.pageTab};
    font-weight: 400;
    color: ${theme.font.colors.title};
  `,
)
