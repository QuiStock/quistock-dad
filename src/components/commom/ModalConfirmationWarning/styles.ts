import { Modal } from '@mui/material'
import styled, { css } from 'styled-components'

interface IProps {
  color: 'main' | 'red'
}

export const StyledModal = styled(Modal)(
  () => css`
    && {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,
)

export const Wrapper = styled('div')(
  ({ theme }) => css`
    width: 60%;
    height: fit-content;
    background-color: ${theme.colors.white};
    padding: 2.5rem;
  `,
)

export const ModalTitle = styled('p')<IProps>(
  ({ theme, color }) => css`
    && {
      font-family: ${theme.font.family.base};
      color: ${
        color === 'red' ? theme.font.colors.error : theme.font.colors.title
      };
      font-size: ${theme.font.size.title};
      font-weight: 700;
      margin-bottom: 2rem;
    }
  `,
)

export const ModalContent = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      color: ${theme.font.colors.main};
      font-size: ${theme.font.size.pageTab};
      font-weight: 400;
      margin: 1.5rem 0;
    }
  `,
)

export const ConfirmationBox = styled('label')(
  () => css`
    display: flex;
    align-items: center;
    margin-top: 2rem;
    transform: translateX(-0.9rem);
  `,
)

export const ButtonContainer = styled('div')(
  () => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2.5rem;
    margin-top: 2rem;
    margin-left: auto;
  `,
)
