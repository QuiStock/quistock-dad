import styled, { css } from "styled-components";
interface IDirection {
  direction?: "row" | "column";
  fitContent?: boolean;
}

interface IAlign {
  align?: "center" | "start" | "end";
}

export const Wrapper = styled("div")<IDirection>(
  ({ theme, direction, fitContent }) => css`
    width: fit-content;
    max-width: 70vw;
    display: flex;
    gap: 2rem;
    margin: 0 auto;
    padding: ${!fitContent && "5rem 0"};

    ${direction === "column" &&
    css`
      flex-direction: column;
      align-items: center;
    `}

    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
      align-items: center;
    }
  `
);

export const BoxContent = styled("div")<IAlign>(
  ({ theme, align }) => css`
    && {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: ${align ? align : "center"};
      gap: 2rem;
      color: ${theme.font.colors.main};
      max-width: 100%;

      p,
      span {
        text-align: ${align ? align : "center"};
        font-family: ${theme.font.family.base};
        font-size: ${theme.font.size.subtitle};
      }

      > p {
        color: ${theme.font.colors.title};
      }

      em {
        text-align: center;
        font-family: ${theme.font.family.base};
        font-style: normal;
        font-weight: 500;
        font-size: ${theme.font.size.pageTab};
      }

      em span {
        font-weight: 700;
        font-size: ${theme.font.size.subtitle};
      }

      div span {
        font-weight: 700;
        font-size: ${theme.font.size.body1};
      }

      div p {
        font-weight: 300;
        font-size: ${theme.font.size.body2};
      }

      .small-text {
        font-weight: 300;
        font-size: 2rem;
      }
    }
  `
);
