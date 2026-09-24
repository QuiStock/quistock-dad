import * as S from '@/components/auth/LoginFlow/loginStyles'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'

interface IBoxLogin {
  setUserDocument?: (document: string) => void
  setVerifiedUser?: (verifiedUser: boolean) => void
}

const BoxLogin = ({ setUserDocument, setVerifiedUser }: IBoxLogin) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowInputValue = () => setShowPassword((curr) => !curr)

  const handleLogin = () => {
    // Aqui você integraria a lógica de login com os dois campos (email e password)
    // Exemplo:
    setUserDocument?.(email)
    // Para simplificar, estamos apenas avançando para o próximo passo se tiver dados
    if (email && password) {
      setVerifiedUser?.(true)
    }
  }

  return (
    <>
      <S.HeaderContainer>
        <S.LoginTitle>Entre agora!</S.LoginTitle>
        <S.Subtitle>Por favor, insira suas credenciais.</S.Subtitle>
      </S.HeaderContainer>

      <S.UserInput
        label={'E-mail'}
        placeholder="Ex: seunome@gmail.com"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value)
        }}
      />

      <S.LoginPassword
        value={password}
        label={'Senha'}
        placeholder="Digite a sua senha"
        type={showPassword ? 'text' : 'password'}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleLogin()
        }}
        icon={
          <IconButton onClick={() => handleClickShowInputValue()}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
      />

      <S.LoginButtonContainer>
        <S.SubmitButton onClick={handleLogin} disabled={!email || !password}>
          Entrar
        </S.SubmitButton>
      </S.LoginButtonContainer>
    </>
  )
}

export { BoxLogin }
