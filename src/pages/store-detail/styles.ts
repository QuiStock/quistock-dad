import styled, { css } from 'styled-components'

export {
  Card,
  DetailItem,
  DetailLabel,
  DetailList,
  DetailValue,
  EmptyText,
  Feedback,
  FullSection,
  Identity,
  IconAvatar as StoreAvatar,
  IdentityText,
  MetricGrid,
  MetricTile,
  Name,
  Section,
  SectionTitle,
  Sections,
  SkeletonIdentity,
  StatusBadge,
  Subtitle,
  Toolbar,
  Wrapper,
} from '@/components/commom/DetailCard/styles'

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
