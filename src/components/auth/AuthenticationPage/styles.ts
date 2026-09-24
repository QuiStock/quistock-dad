import styled, { css } from 'styled-components'

export const Container = styled('div')(
  () => css`
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #11061F;
    overflow: hidden;
  `
)

export const Wrapper = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    z-index: 1;
  `
)

export const Title = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      color: ${theme.font.colors.title};
      font-size: ${theme.font.size.bigTitle};
      font-weight: 1000;
      margin: 2rem;
    }
  `
)

export const Background = styled('img')(
  () => css`
    && {
      position: absolute;
      right: 0;
      top: 0;
      height: 100vh;
      width: auto;
      max-width: 60vw;
      object-fit: cover;
      object-position: right center;
      z-index: 0;
    }
  `
)