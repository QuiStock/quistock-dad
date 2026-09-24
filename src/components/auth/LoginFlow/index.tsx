import * as S from '@/components/auth/LoginFlow/loginStyles'

import { useState } from 'react'

import { Logo } from '@/components/auth/Logo'
import { BoxLogin } from '@/partials/BoxLogin'


const LoginFlow = () => {
  const [userDocument, setUserDocument] = useState('')
  const [verifiedUser, setVerifiedUser] = useState(false)

  return (
    <>
      <S.BoxForm>
        <Logo src="/images/quistock-roxo.svg" alt="Logo Quistock" />

        <BoxLogin
          setUserDocument={setUserDocument}
          setVerifiedUser={setVerifiedUser}
        />
      </S.BoxForm>
    </>
  )
}

export { LoginFlow }
