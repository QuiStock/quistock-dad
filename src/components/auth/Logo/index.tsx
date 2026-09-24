import * as S from './styles'

interface IImg {
  src: string
  alt: string
}

const Logo = (props: IImg) => <S.Logo {...props} />

export { Logo }
