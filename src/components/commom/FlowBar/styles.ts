import styled, { css, keyframes } from 'styled-components'

const grow = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`

export const List = styled('ul')(
  () => css`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
)

export const Item = styled('li')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
)

export const Header = styled('div')(
  ({ theme }) => css`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 1.6rem;
    font-family: ${theme.font.family.base};

    span {
      font-size: ${theme.font.size.base};
      font-weight: 400;
      color: ${theme.font.colors.title2};
    }

    strong {
      flex-shrink: 0;
      font-size: ${theme.font.size.base};
      font-weight: 500;
      color: ${theme.font.colors.title2};
      font-variant-numeric: tabular-nums;

      small {
        margin-left: 0.4rem;
        font-size: ${theme.font.size.base};
        font-weight: 300;
        color: ${theme.font.colors.main};
      }
    }
  `,
)

export const Track = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: 0.8rem;
    border-radius: 10rem;
    background-color: ${theme.colors.lightGray3};
    overflow: hidden;
  `,
)

export const Fill = styled('div')<{ $percentage: number; $color: string }>(
  ({ theme, $percentage, $color }) => css`
    width: ${Math.min(100, Math.max(0, $percentage))}%;
    height: 100%;
    border-radius: 10rem;
    background-color: ${$color};
    transform-origin: left center;
    animation: ${grow} ${theme.motion.reveal} ${theme.motion.easeOut} both;
  `,
)
