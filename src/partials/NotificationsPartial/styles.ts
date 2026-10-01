import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.4rem;
  `,
)

export const NotificationsList = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `,
)

export const PaginationWrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 2.4rem;

    .MuiPaginationItem-root {
      font-size: 1.6rem;
      font-weight: bold;
      color: ${theme.font.colors.title2};
    }
  `,
)
