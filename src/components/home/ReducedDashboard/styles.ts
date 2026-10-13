import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    gap: 2rem;

    @media (max-width: ${theme.screen.small}) {
      flex-direction: column;
    }
  `,
)

export const Column = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    flex: 1;
  `,
)

export const Header = styled('div')(
  () => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
)

export const SeeMoreButton = styled('div')(
  () => css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
)

export const Content = styled('div')(
  () => css`
    width: 100%;
  `,
)

export const CardContainer = styled('div')(
  ({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    padding: 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    min-height: 20rem;
    justify-content: center;
  `,
)

export const MiniKpisGrid = styled('div')(
  () => css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.4rem;
  `,
)

export const MiniKpi = styled('div')<{ $borderColor?: string }>(
  ({ theme, $borderColor }) => css`
    background: ${theme.colors.lightGray2};
    border-radius: ${theme.borderRadius.main};
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border-left: 4px solid ${$borderColor || '#7623E1'};
  `,
)

export const MiniKpiTitle = styled('span')(
  ({ theme }) => css`
    font-size: ${theme.font.size.minimum};
    color: ${theme.font.colors.main};
    font-weight: 500;
  `,
)

export const MiniKpiValue = styled('span')<{ $color?: string }>(
  ({ theme, $color }) => css`
    font-size: ${theme.font.size.title};
    font-weight: 700;
    color: ${$color || theme.font.colors.title};
    font-family: ${theme.font.family.base};
  `,
)

export const FlowBarGroup = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  `,
)

export const FlowItem = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  `,
)

export const FlowItemHeader = styled('div')(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    font-size: ${theme.font.size.minimum};
    color: ${theme.font.colors.dark};
    font-weight: 500;
  `,
)

export const FlowTrack = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: 0.8rem;
    background: ${theme.colors.progressBarBG};
    border-radius: 0.4rem;
    overflow: hidden;
  `,
)

export const FlowFill = styled('div')<{ $percentage: number; $color: string }>(
  ({ $percentage, $color }) => css`
    width: ${Math.min(100, Math.max(0, $percentage))}%;
    height: 100%;
    background-color: ${$color};
    border-radius: 0.4rem;
    transition: width 0.5s ease;
  `,
)
