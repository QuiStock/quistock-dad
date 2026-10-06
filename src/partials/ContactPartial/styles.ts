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
          border-color: #a855f7;
        }
        &:hover fieldset {
          border-color: #7f3aef;
        }
        &.Mui-focused fieldset {
          border-color: #7f3aef;
        }
      }

      label {
        color: #a855f7;
      }
      label.Mui-focused {
        color: #7f3aef;
      }
    }
  `,
)

export const SubmitButton = styled('button')<{ disabled?: boolean }>(
  ({ disabled }) => css`
    width: 100%;
    padding: 1.2rem;
    background-color: #7f3aef;
    color: white;
    border: none;
    border-radius: 0.8rem;
    font-size: 1.6rem;
    font-weight: 600;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
    opacity: ${disabled ? 0.7 : 1};
    transition: all 0.2s ease-in-out;

    &:not(:disabled):hover {
      background-color: #6826cc;
    }
  `,
)
