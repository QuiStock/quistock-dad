import * as S from '@/components/auth/LoginFlow/loginStyles'
import { useState, type ChangeEvent } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import type { ILoginCredentials } from '@/types'
import { validateLoginCredentials } from '@/utils/validateForms'

interface IBoxLogin {
  setUserDocument?: (document: string) => void
  setVerifiedUser?: (verifiedUser: boolean) => void
}

const BoxLogin = ({ setUserDocument, setVerifiedUser }: IBoxLogin) => {
  const [credentials, setCredentials] = useState<ILoginCredentials>({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showValidationErrors, setShowValidationErrors] = useState(false)
  const navigate = useNavigate()
  const { login, isLoading } = useAuth()

  const handleClickShowInputValue = () => setShowPassword((curr) => !curr)

  const { email, password } = credentials
  const validationErrors = validateLoginCredentials(credentials)

  const handleFieldChange =
    (field: keyof ILoginCredentials) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setCredentials((prev) => ({ ...prev, [field]: value }))
    }

  const handleLogin = async () => {
    setShowValidationErrors(true)
    if (Object.keys(validationErrors).length > 0 || isLoading) return

    const normalizedEmail = email.trim()
    setUserDocument?.(normalizedEmail)
    const success = await login(normalizedEmail, password)
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
        error={showValidationErrors && Boolean(validationErrors.email)}
        helperText={showValidationErrors ? validationErrors.email : undefined}
        slotProps={{ htmlInput: { maxLength: 254 } }}
        onChange={handleFieldChange('email')}
      />

      <S.LoginPassword
        value={password}
        label={'Senha'}
        placeholder="Digite a sua senha"
        type={showPassword ? 'text' : 'password'}
        helperText={
          showValidationErrors && validationErrors.password ? (
            validationErrors.password
          ) : (
            <span>
              Esqueceu a senha? <strong>Contate o QuiStock.</strong>
            </span>
          )
        }
        error={showValidationErrors && Boolean(validationErrors.password)}
        slotProps={{ htmlInput: { maxLength: 128 } }}
        onChange={handleFieldChange('password')}
        onKeyDown={(e) => {
          if (e.key === 'Enter') void handleLogin()
        }}
        icon={
          <IconButton
            aria-label={
              showPassword ? 'Ocultar caracteres' : 'Exibir caracteres'
            }
            onClick={handleClickShowInputValue}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        }
      />

      <S.LoginButtonContainer>
        <S.SubmitButton
          onClick={() => void handleLogin()}
          disabled={Object.keys(validationErrors).length > 0 || isLoading}
        >
          Entrar
        </S.SubmitButton>
      </S.LoginButtonContainer>
    </>
  )
}

export { BoxLogin }
