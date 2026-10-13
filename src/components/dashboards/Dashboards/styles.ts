import styled, { css } from 'styled-components'

export const Wrapper = styled('div')(
  () => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
  `,
)

export const Section = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
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

export const Content = styled('div')(
  () => css`
    width: 100%;
  `,
)

export const KpiGrid = styled('div')(
  () => css`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    gap: 2rem;
    width: 100%;
  `,
)

export const KpiCard = styled('div')<{ $borderColor?: string }>(
  ({ theme, $borderColor }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    padding: 2.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    border-top: 4px solid ${$borderColor || '#7623E1'};
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0.4rem 0.8rem 0 #23237830;
    }
  `,
)

export const KpiCardHeader = styled('div')(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: ${theme.font.size.base};
    font-weight: 500;
    color: ${theme.font.colors.title};
  `,
)

export const KpiValue = styled('span')<{ $color?: string }>(
  ({ theme, $color }) => css`
    font-size: ${theme.font.size.bigTitle};
    font-weight: 700;
    color: ${$color || theme.font.colors.title};
    line-height: 1.2;
    font-family: ${theme.font.family.base};
  `,
)

export const KpiDescription = styled('span')(
  ({ theme }) => css`
    font-size: ${theme.font.size.minimum};
    color: ${theme.font.colors.main};
  `,
)

export const ChartsContainer = styled('div')(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2.4rem;

    @media (max-width: ${theme.screen.medium}) {
      grid-template-columns: 1fr;
    }
  `,
)

export const ChartCard = styled('div')(
  ({ theme }) => css`
    background: ${theme.colors.white};
    border-radius: ${theme.borderRadius.main};
    box-shadow: ${theme.boxShadow.main};
    padding: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  `,
)

export const ChartTitle = styled('h3')(
  ({ theme }) => css`
    font-size: ${theme.font.size.body2};
    font-weight: 600;
    color: ${theme.font.colors.title};
    margin: 0;
  `,
)

export const ProgressBarWrapper = styled('div')(
  () => css`
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  `,
)

export const ProgressBarHeader = styled('div')(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    font-size: ${theme.font.size.body1};
    color: ${theme.font.colors.dark};
    font-weight: 500;
  `,
)

export const ProgressBarTrack = styled('div')(
  ({ theme }) => css`
    width: 100%;
    height: 1.2rem;
    background: ${theme.colors.progressBarBG};
    border-radius: 0.6rem;
    overflow: hidden;
  `,
)

export const ProgressBarFill = styled('div')<{ $percentage: number; $color: string }>(
  ({ $percentage, $color }) => css`
    width: ${Math.min(100, Math.max(0, $percentage))}%;
    height: 100%;
    background-color: ${$color};
    border-radius: 0.6rem;
    transition: width 0.5s ease-in-out;
  `,
)
