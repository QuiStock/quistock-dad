import styled, { css } from "styled-components";

export const Wrapper = styled("div")(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    position: fixed;
    bottom: 2rem;
    left: 1rem;
    width: fit-content;
    max-height: 25rem;
    overflow: auto;
    z-index: 99999;
    padding: 1rem;

    &::-webkit-scrollbar {
      width: 0;
    }
  `,
);
