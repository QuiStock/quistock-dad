import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  `,
)

export const Section = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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

export const Content = styled('div')(
  () => css`
    width: 100%;
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  `,
)
