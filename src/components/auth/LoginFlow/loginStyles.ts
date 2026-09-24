import styled, { css } from 'styled-components'
import { IconButton, Link } from '@mui/material'
import { ButtonWithIcon } from '@/components/commom/ButtonWithIcon'
import { TextInputComponent } from '@/components/commom/TextInputComponent'
import { ButtonComponent } from '@/components/commom/ButtonComponent'
import { TextInputWithIcon } from '@/components/commom/TextInputWithIcon'

export const BoxForm = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    padding: 3.2rem;
    font-family: ${theme.font.family.base};
    width: 60rem;
    border-radius: 25px;
    border: 1rem solid #3b2c4e;
    box-shadow: ${theme.boxShadow.main};
    background-color: ${theme.colors.white};

    @media (max-width: ${theme.screen.small}) {
      width: 95%;
    }
  `,
)

export const Title = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      color: ${theme.font.colors.title};
      font-size: ${theme.font.size.title};
      font-weight: 700;
      margin: 0;
      margin-top: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      @media (max-width: ${theme.screen.small}) {
        font-size: ${theme.font.size.pageTab};
      }

      svg {
        color: ${theme.font.colors.title};
      }
    }
  `,
)

export const UserInput = styled(TextInputComponent)(
  () => css`
    && {
      margin-top: 4rem;
    }
  `,
)

export const UserPassword = styled(TextInputWithIcon)(
  () => css`
    && {
      margin-top: 4rem;
    }
  `,
)

export const ButtonForgotPass = styled(ButtonComponent)(
  () => css`
    && {
      width: fit-content;
    }
  `,
)

export const HelpLink = styled(Link)(
  ({ theme }) => css`
    && {
      color: ${theme.colors.lightBlue};
      margin-top: 2rem;
      margin-bottom: 4rem;
      font-weight: 300;
    }
  `,
)

export const ButtonContainer = styled('div')(
  () => css`
    && {
      display: flex;
      justify-content: right;
      margin-top: 4rem;
    }
  `,
)

export const AdvanceButton = styled(ButtonWithIcon)(
  () => css`
    && {
      align-self: self-end;
    }
  `,
)

export const ReturnButton = styled(ButtonWithIcon)(
  () => css`
    && {
      align-self: self-start;
      margin-right: 2rem;
    }
  `,
)

export const BoxPlatforms = styled('div')(
  ({ theme }) => css`
    width: fit-content;
    display: flex;
    gap: 3.2rem;
    justify-content: center;

    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
    }
  `,
)

export const BoxPlatform = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.8rem;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    background-color: ${theme.colors.white};
    padding: 2.8rem;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      scale: 1.03;
      background-color: ${theme.colors.gray};
    }
  `,
)

export const PlatformName = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      color: ${theme.font.colors.title};
      font-size: ${theme.font.size.title};
      font-weight: 600;

      @media (max-width: ${theme.screen.small}) {
        font-size: ${theme.font.size.pageTab};
      }
    }
  `,
)

export const StyledIconButton = styled(IconButton)(
  ({ theme }) => css`
    && {
      background-color: ${theme.colors.lightBlue};
      padding: 0.4rem;
      transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      &&:hover {
        background-color: ${theme.colors.lightBlue};
        opacity: 0.6;
      }

      svg {
        color: ${theme.colors.white};
        font-size: ${theme.font.size.pageTab};
      }
    }
  `,
)

export const ForgotPasswordContent = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2.4rem;
  `,
)

export const ForgotPasswordMessage = styled('p')(
  ({ theme }) => css`
    && {
      font-family: ${theme.font.family.base};
      color: ${theme.font.colors.title};
      font-size: ${theme.font.size.body1};
      font-weight: 400;
    }
  `,
)

export const HeaderContainer = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 2rem;
  `,
)

export const LoginTitle = styled(Title)(
  () => css`
    && {
      margin-top: 0;
      color: #000;
    }
  `,
)

export const Subtitle = styled('p')(
  () => css`
    margin: 0;
    font-size: 1.4rem;
    color: #666;
  `,
)

export const LoginPassword = styled(UserPassword)(
  () => css`
    && {
      margin-top: 2rem;
    }
  `,
)

export const LoginButtonContainer = styled(ButtonContainer)(
  () => css`
    && {
      width: 100%;
      margin-top: 3rem;
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
    transition: opacity 0.2s;
  `,
)
