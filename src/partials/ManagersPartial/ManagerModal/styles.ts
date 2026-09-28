import styled, { css } from 'styled-components'

export const BoxModal = styled('div')(
  ({ theme }) => css`
    width: 60%;
    min-height: 20rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${theme.colors.white};
    box-shadow: ${theme.boxShadow.main};
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    border-radius: ${theme.borderRadius.main};

    @media (max-width: ${theme.screen.small}) {
      width: 95%;
    }
  `,
)

export const Title = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      font-style: normal;
      font-weight: 500;
      font-size: ${theme.font.size.subtitle};
      color: ${theme.font.colors.title};
    }
  `,
)

export const FormContainer = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `,
)

export const BoxButtons = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 2rem;
    margin-top: auto;

    @media (max-width: ${theme.screen.small}) {
      gap: 1rem;
    }
  `,
)
