import styled, { css } from 'styled-components'

// Space between the two home blocks is larger than any gap inside them.
export const Stack = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 4.8rem;

    @media (max-width: ${theme.screen.small}) {
      gap: 3.2rem;
    }
  `,
)
