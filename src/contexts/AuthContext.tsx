/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
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
  if (isAxiosError<{ message?: string }>(error)) {
    if (error.response?.status === 401) return 'E-mail ou senha inválidos.'
    if (error.response?.status === 403)
      return (
        error.response.data?.message ??
        'Seu perfil não tem acesso a esta plataforma.'
      )
    return error.response?.data?.message ?? 'Erro ao realizar login.'
  }
  return 'Erro ao realizar login.'
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
    } finally {
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    void refreshSession().finally(() => setIsLoading(false))
  }, [refreshSession])

  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout, refreshSession }),
    [isAuthenticated, isLoading, login, logout, refreshSession],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthContext, AuthProvider, useAuth }
