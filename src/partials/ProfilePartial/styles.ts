import styled, { css } from 'styled-components'

import { Toolbar } from '@/components/commom/DetailCard/styles'

export {
  AvatarStyled,
  Card,
  DetailList,
  Identity,
  IdentityText,
  Name,
  Section,
  SectionTitle,
  Sections,
  SkeletonIdentity,
  StatusBadge,
  Subtitle,
  Wrapper,
} from '@/components/commom/DetailCard/styles'

export const Actions = styled(Toolbar)(
  () => css`
    justify-content: flex-end;
  `,
)
