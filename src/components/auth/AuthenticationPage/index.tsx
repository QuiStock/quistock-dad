import { type ReactNode } from 'react'
import * as S from './styles'

interface IAuthenticationPage {
  children: ReactNode
  title: string
}

const AuthenticationPage = ({ children, title }: IAuthenticationPage) => {
  return (
    <>
      <title>{`QuiStock | ${title}`}</title>
      <S.Container>
        <S.Background src="/images/wing-background.png" alt="background" />
        <S.Wrapper>{children}</S.Wrapper>
      </S.Container>
    </>
  )
}

export { AuthenticationPage }
