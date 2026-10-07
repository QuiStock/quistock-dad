import * as S from '@/components/auth/LoginFlow/loginStyles'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface IBoxLogin {
  setUserDocument?: (document: string) => void
  setVerifiedUser?: (verifiedUser: boolean) => void
}

const BoxLogin = ({ setUserDocument, setVerifiedUser }: IBoxLogin) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()

  const handleClickShowInputValue = () => setShowPassword((curr) => !curr)

  const handleLogin = async () => {
    if (!email || !password || isLoading) return

    setUserDocument?.(email)
    const success = await login(email, password)
    if (success) {
      setVerifiedUser?.(true)
      void navigate('/home')
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
        helperText={
          <span>
            Esqueceu a senha? <strong>Contate o QuiStock.</strong>
          </span>
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void handleLogin()
        }}
        icon={
          <IconButton onClick={() => handleClickShowInputValue()}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
      />

      <S.LoginButtonContainer>
        <S.SubmitButton
          onClick={() => void handleLogin()}
          disabled={!email || !password || isLoading}
        >
          Entrar
        </S.SubmitButton>
      </S.LoginButtonContainer>
    </>
  )
}

export { BoxLogin }
