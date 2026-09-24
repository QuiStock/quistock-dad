import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    gap: 2rem;
    
    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
    }
  `,
)

export const Column = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    
    &:first-child {
      flex: 1;
    }
  `,
)

export const Header = styled('div')(
  () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
)

export const SeeMoreButton = styled('div')(
  () => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
)

export const Content = styled('div')(
  () => css`
    width: 100%;
    img {
      max-width: 80%;
      height: auto;
      display: block;
    }
  `,
)
