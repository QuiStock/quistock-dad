import * as S from './styles'

interface ILoadingMaskProps {
  isLoading: boolean
}

/* eslint-disable @next/next/no-img-element */
const LoadingMask = ({ isLoading }: ILoadingMaskProps) => (
  <>
    {isLoading && (
      <S.Wrapper data-testid="loading">
        <img src="/admin/images/loading.gif" alt="loading" />
      </S.Wrapper>
    )}
  </>
)

export { LoadingMask }
