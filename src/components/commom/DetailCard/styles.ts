import styled, { css } from 'styled-components'

import { Avatar } from '@mui/material'

// Building blocks of the detail screens (store, manager, profile).
// Every screen that shows one record reuses these, so spacing and type stay
// identical: 0.4 / 0.8 / 1.2 / 1.6 / 2.0 / 2.4 / 3.2rem.

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    max-width: 96rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  `,
)

export const Toolbar = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;

    @media (max-width: ${theme.screen.xsmall}) {
      flex-wrap: wrap;
    }
  `,
)

export const Card = styled('article')(
  ({ theme }) => css`
    width: 100%;
    overflow: hidden;
    background-color: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    font-family: ${theme.font.family.base};
  `,
)

export const Identity = styled('header')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 3.2rem;
    background-color: ${theme.colors.brandDeep};
    color: ${theme.colors.white};

    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
      align-items: flex-start;
      gap: 1.6rem;
      padding: 2.4rem;
    }
  `,
)

export const AvatarStyled = styled(Avatar)(
  ({ theme }) => css`
    && {
      width: 8.8rem;
      height: 8.8rem;
      flex-shrink: 0;
      background-color: ${theme.colors.brandPrimary};
      border: 0.3rem solid ${theme.colors.white};
      font-family: ${theme.font.family.base};
      font-size: ${theme.font.size.bigTitle};
      font-weight: 400;
    }
  `,
)

export const IconAvatar = styled('div')(
  ({ theme }) => css`
    width: 8.8rem;
    height: 8.8rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0.3rem solid ${theme.colors.white};
    background-color: ${theme.colors.brandPrimary};
    color: ${theme.colors.white};

    svg {
      width: 4.4rem;
      height: 4.4rem;
    }
  `,
)

export const IdentityText = styled('div')(
  () => css`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  `,
)

export const Name = styled('h1')(
  ({ theme }) => css`
    margin: 0;
    font-size: ${theme.font.size.title};
    font-weight: 500;
    line-height: 1.2;
    overflow-wrap: anywhere;
  `,
)

export const Subtitle = styled('p')(
  ({ theme }) => css`
    margin: 0;
    font-size: ${theme.font.size.body1};
    font-weight: 300;
    color: ${theme.colors.brandOnDeep};
    overflow-wrap: anywhere;
  `,
)

export const StatusBadge = styled('span')<{ $active: boolean }>(
  ({ theme, $active }) => css`
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    margin-top: 0.6rem;
    padding: 0.4rem 1.2rem;
    border-radius: 10rem;
    background-color: ${$active ? theme.colors.successTint : theme.colors.white100};
    color: ${$active ? theme.font.colors.success : theme.colors.darkGray};
    font-size: ${theme.font.size.base};
    font-weight: 500;

    &::before {
      content: '';
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      background-color: ${$active ? theme.font.colors.check : theme.colors.gray300};
    }
  `,
)

export const Sections = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));

    @media (max-width: ${theme.screen.small}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const Section = styled('section')(
  ({ theme }) => css`
    padding: 2.4rem 3.2rem 3.2rem;

    & + & {
      border-left: 0.1rem solid ${theme.colors.lightGray3};
    }

    @media (max-width: ${theme.screen.small}) {
      padding: 2.4rem;

      & + & {
        border-left: none;
        border-top: 0.1rem solid ${theme.colors.lightGray3};
      }
    }
  `,
)

export const FullSection = styled('section')(
  ({ theme }) => css`
    padding: 2.4rem 3.2rem 3.2rem;
    border-top: 0.1rem solid ${theme.colors.lightGray3};

    @media (max-width: ${theme.screen.small}) {
      padding: 2.4rem;
    }
  `,
)

export const SectionTitle = styled('h2')(
  ({ theme }) => css`
    margin: 0 0 2rem;
    font-size: ${theme.font.size.pageTab};
    font-weight: 400;
    color: ${theme.font.colors.title};
  `,
)

export const DetailList = styled('dl')(
  () => css`
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
)

export const DetailItem = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 4rem 1fr;
    column-gap: 1.2rem;
    align-items: center;

    svg {
      grid-row: span 2;
      width: 4rem;
      height: 4rem;
      padding: 0.8rem;
      border-radius: ${theme.borderRadius.main};
      background-color: ${theme.colors.brandTint};
      color: ${theme.colors.brandPrimary};
    }
  `,
)

export const DetailLabel = styled('dt')(
  ({ theme }) => css`
    font-size: ${theme.font.size.base};
    font-weight: 300;
    color: ${theme.font.colors.main};
  `,
)

export const DetailValue = styled('dd')(
  ({ theme }) => css`
    margin: 0;
    font-size: ${theme.font.size.body2};
    font-weight: 400;
    color: ${theme.font.colors.title2};
    overflow-wrap: anywhere;

    small {
      margin-left: 0.8rem;
      font-size: ${theme.font.size.base};
      font-weight: 300;
      color: ${theme.font.colors.main};
    }
  `,
)

export const MetricGrid = styled('ul')(
  ({ theme }) => css`
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.6rem;

    @media (max-width: ${theme.screen.small}) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (max-width: ${theme.screen.xsmall}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const MetricTile = styled('li')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding: 1.6rem 2rem;
    border-radius: ${theme.borderRadius.main};
    background-color: ${theme.colors.brandTint};

    strong {
      font-size: ${theme.font.size.title};
      font-weight: 500;
      line-height: 1.2;
      color: ${theme.colors.brandInk};
      font-variant-numeric: tabular-nums;
    }

    span {
      font-size: ${theme.font.size.base};
      font-weight: 300;
      color: ${theme.font.colors.main};
    }
  `,
)

export const SkeletonIdentity = styled('div')(
  () => css`
    display: flex;
    align-items: center;
    gap: 2.4rem;
    padding: 3.2rem;
  `,
)

// Tinted surface with a leading icon instead of a coloured side stripe.
export const Feedback = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: grid;
    grid-template-columns: 2.4rem 1fr;
    column-gap: 1.6rem;
    align-items: start;
    padding: 2.4rem 3.2rem;
    border-radius: ${theme.borderRadius.main};
    background-color: ${theme.colors.errorTint};
    color: ${theme.colors.errorInk};
    font-family: ${theme.font.family.base};

    svg {
      width: 2.4rem;
      height: 2.4rem;
      color: ${theme.font.colors.error};
    }

    strong {
      display: block;
      margin-bottom: 0.4rem;
      font-size: ${theme.font.size.body1};
      font-weight: 500;
    }

    p {
      margin: 0;
      font-size: ${theme.font.size.base};
    }

    @media (max-width: ${theme.screen.small}) {
      padding: 2rem 2.4rem;
    }
  `,
)

export const EmptyText = styled('p')(
  ({ theme }) => css`
    margin: 0;
    font-size: ${theme.font.size.base};
    color: ${theme.font.colors.main};
  `,
)
