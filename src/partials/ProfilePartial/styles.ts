import styled, { css } from 'styled-components'

import { Avatar } from '@mui/material'

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

export const Profile = styled('div')(
  () => css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
)

export const AvatarStyled = styled(Avatar)(
  ({ theme }) => css`
    && {
      width: 12.4rem;
      height: 12.4rem;
      font-weight: normal;
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.xlTitle};
    }
  `,
)

export const PersonalInformation = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1.6rem;
    height: fit-content;

    width: 100%;
    max-width: 500px;

    padding: 2.4rem;
    background: white;
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    font-family: ${theme.font.family.base};

    h1 {
      color: ${theme.font.colors.title};
      font-size: ${theme.font.size.pageTab};
      font-weight: 400;
    }

    p {
      color: ${theme.font.colors.main};
      font-size: ${theme.font.size.body2};
      font-weight: 400;

      span {
        color: ${theme.font.colors.title};
        font-size: ${theme.font.size.body1};
        font-weight: 300;
      }
    }
  `,
)
