import * as S from './styles'

interface ILoadingMaskProps {
  isLoading: boolean
}

const LoadingMask = ({ isLoading }: ILoadingMaskProps) => (
  <>
    {isLoading && (
      <S.Wrapper data-testid="loading" role="status" aria-live="polite">
        <img src="/images/loading.gif" alt="Carregando" />
      </S.Wrapper>
    )}
  </>
)

export { LoadingMask }
