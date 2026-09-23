import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    z-index: 3000;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20rem;
    }
  `,
)
