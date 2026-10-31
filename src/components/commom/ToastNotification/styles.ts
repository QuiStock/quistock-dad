import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    position: fixed;
    bottom: 1.6rem;
    left: 0.8rem;
    width: fit-content;
    max-height: 25rem;
    overflow: auto;
    z-index: 99999;
    padding: 0.8rem;

    &::-webkit-scrollbar {
      width: 0;
    }
  `,
)
