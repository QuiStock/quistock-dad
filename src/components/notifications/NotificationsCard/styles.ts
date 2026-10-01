import styled, { css } from 'styled-components'

export const CardContainer = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.6rem 2.4rem;
    border: 1px solid ${theme.colors.lightBlue};
    border-radius: 4rem;
    background-color: ${theme.colors.white};
    width: 100%;
    margin-bottom: 1.6rem;

    @media (max-width: ${theme.screen.small}) {
      padding: 1.2rem 1.6rem;
      border-radius: 2rem;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.2rem;
    }
  `,
)

export const LeftContent = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 1.6rem;

    svg {
      font-size: 2.4rem;
      color: ${theme.font.colors.title2};
    }
  `,
)

export const Message = styled('p')(
  ({ theme }) => css`
    font-size: ${theme.font.size.body1};
    font-weight: 500;
    color: ${theme.font.colors.title2};
    font-family: ${theme.font.family.base};
    margin: 0;

    @media (max-width: ${theme.screen.small}) {
      font-size: ${theme.font.size.base};
    }
  `,
)

export const DateText = styled('span')(
  ({ theme }) => css`
    font-size: ${theme.font.size.body1};
    color: ${theme.font.colors.main};
    font-family: ${theme.font.family.base};
    white-space: nowrap;
    margin-left: 1.6rem;

    @media (max-width: ${theme.screen.small}) {
      font-size: ${theme.font.size.base};
      margin-left: 0;
      align-self: flex-end;
    }
  `,
)
