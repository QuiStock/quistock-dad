import styled, { css } from 'styled-components'

export {
  Card,
  DetailItem,
  DetailLabel,
  DetailList,
  DetailValue,
  Email as Subtitle,
  Feedback,
  Identity,
  IdentityText,
  Name,
  Section,
  SectionTitle,
  Sections,
  SkeletonIdentity,
  StatusBadge,
  Toolbar,
  Wrapper,
} from '@/pages/manager-detail/styles'

export const StoreAvatar = styled('div')(
  ({ theme }) => css`
    width: 8.8rem;
    height: 8.8rem;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 0.3rem solid ${theme.colors.white};
    background-color: #7623e1;
    color: ${theme.colors.white};

    svg {
      width: 4.4rem;
      height: 4.4rem;
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
    background-color: #f3ecfd;

    strong {
      font-size: ${theme.font.size.title};
      font-weight: 500;
      line-height: 1.2;
      color: #4b1694;
    }

    span {
      font-size: ${theme.font.size.base};
      font-weight: 300;
      color: ${theme.font.colors.main};
    }
  `,
)

export const ManagerList = styled('ul')(
  () => css`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
)

export const ManagerItem = styled('li')(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.6rem;
    padding: 1.2rem 1.6rem;
    border: 0.1rem solid ${theme.colors.lightGray3};
    border-radius: ${theme.borderRadius.main};

    @media (max-width: ${theme.screen.xsmall}) {
      flex-direction: column;
      align-items: flex-start;
    }
  `,
)

export const ManagerInfo = styled('div')(
  ({ theme }) => css`
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    strong {
      font-size: ${theme.font.size.body2};
      font-weight: 400;
      color: ${theme.font.colors.title2};
      overflow-wrap: anywhere;
    }

    span {
      font-size: ${theme.font.size.base};
      font-weight: 300;
      color: ${theme.font.colors.main};
      overflow-wrap: anywhere;
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
