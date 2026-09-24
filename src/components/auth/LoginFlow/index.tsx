import * as S from '@/components/auth/LoginFlow/loginStyles'

import { Logo } from '@/components/auth/Logo'
import { BoxLogin } from '@/partials/BoxLogin'

const LoginFlow = () => {
  return (
    <>
      <S.BoxForm>
        <Logo src="/images/quistock-roxo.svg" alt="Logo Quistock" />

        <BoxLogin />
      </S.BoxForm>
    </>
  )
}

export { LoginFlow }
