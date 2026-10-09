import {
  createContext,
  useCallback,
  use,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isAxiosError } from 'axios'

import emitError from '@/events/emitError'
import { postLogin, postLogout, postRefresh } from '@/services/api-auth'

interface IAuthContext {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshSession: () => Promise<boolean>
}

interface IAuthProviderProps {
  children: ReactNode
}

const DEFAULT_VALUE: IAuthContext = {
  isAuthenticated: false,
  isLoading: false,
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  refreshSession: () => Promise.resolve(false),
}

const AuthContext = createContext<IAuthContext>(DEFAULT_VALUE)

const getErrorMessage = (error: unknown) => {
  // Retorno antecipado se não for um erro do Axios ou não possuir response (reduz aninhamento)
  if (!isAxiosError<{ message?: string }>(error) || !error.response) {
    return 'Erro ao realizar login.'
  }

  // Desestruturação e armazenamento em variáveis (reduz o uso de optional chaining ?.)
  const status = error.response.status
  const message = error.response.data?.message

  if (status === 401) {
    return 'E-mail ou senha inválidos.'
  }

  if (status === 403) {
    return message ?? 'Seu perfil não tem acesso a esta plataforma.'
  }

  return message ?? 'Erro ao realizar login.'
}

const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = useCallback(async () => {
    try {
      await postRefresh()
      setIsAuthenticated(true)
      return true
    } catch {
      setIsAuthenticated(false)
      return false
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await postLogin({ email, password, platform: 'website' })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      setIsAuthenticated(false)
      emitError(getErrorMessage(error))
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await postLogout()
    } catch {
      // Ignore error
    } finally {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    const initSession = async () => {
      await refreshSession()
      setIsLoading(false)
    }
    void initSession()
  }, [refreshSession])

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout, refreshSession }),
    [isAuthenticated, isLoading, login, logout, refreshSession],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}

const useAuth = () => use(AuthContext)

// eslint-disable-next-line
export { AuthContext, AuthProvider, useAuth }
