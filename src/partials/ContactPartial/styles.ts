import styled, { css } from 'styled-components'
import { TextInputComponent } from '@/components/commom/TextInputComponent'

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2.4rem;
  `,
)

export const FormContainer = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
    height: fit-content;

    width: 100%;
    max-width: 800px;
    padding: 0 2.4rem;
  `,
)

export const UserInput = styled(TextInputComponent)(
  ({ theme }) => css`
    && {
      width: 100%;

      textarea {
        padding-top: 0.8rem;
        font-size: ${theme.font.size.body1};
      }

      .MuiOutlinedInput-root {
        fieldset {
          border-color: #9333ea;
        }
        &:hover fieldset {
          border-color: #7f3aef;
        }
        &.Mui-focused fieldset {
          border-color: #7f3aef;
        }
      }

      label {
        color: #9333ea;
      }
      label.Mui-focused {
        color: #7f3aef;
      }
    }
  `,
)

export const SubmitButton = styled('button')<{ disabled?: boolean }>(
  ({ theme, disabled }) => css`
    width: 100%;
    padding: 1.2rem;
    background-color: ${theme.colors.lightBlue};
    color: ${theme.colors.white};
    border: none;
    border-radius: ${theme.borderRadius.main};
    font-family: ${theme.font.family.base};
    font-size: ${theme.font.size.body1};
    font-weight: 500;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.7 : 1};
    transition:
      transform ${theme.motion.press} ${theme.motion.easeOut},
      background-color ${theme.motion.hover} ease,
      opacity ${theme.motion.hover} ease;

    &:not(:disabled):active {
      transform: scale(0.98);
    }

    @media (hover: hover) and (pointer: fine) {
      &:not(:disabled):hover {
        background-color: ${theme.colors.brandPrimary};
      }
    }
  `,
)
