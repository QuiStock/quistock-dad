import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import emitError from '@/events/emitError'
import { postLogin, postLogout, postRefresh } from '@/services/api-auth'
import {
  clearAuthToken,
  getAuthToken,
  isAuthTokenExpired,
} from '@/services/auth-token'
import { SESSION_EXPIRED_EVENT } from '@/services/api-client'
import { AuthContext } from './AuthContext'

interface IAuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const refreshSession = useCallback(
    async (isActive: () => boolean = () => true) => {
      try {
        await postRefresh()
        if (isActive()) setIsAuthenticated(true)
        return true
      } catch {
        clearAuthToken()
        if (isActive()) setIsAuthenticated(false)
        return false
      }
    },
    [],
  )

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    try {
      await postLogin({ email, password, platform: 'website' })
      setIsAuthenticated(true)
      return true
    } catch (error) {
      setIsAuthenticated(false)
      emitError(
        error instanceof Error ? error.message : 'Erro ao realizar login.',
      )
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      await postLogout()
    } catch {
      // Falha no logout no servidor: o token local é limpo mesmo assim
    } finally {
      clearAuthToken()
      setIsAuthenticated(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true

    const initSession = async () => {
      const token = getAuthToken()
      if (token && !isAuthTokenExpired(token)) {
        setIsAuthenticated(true)
      } else if (token) {
        clearAuthToken()
        await refreshSession(() => isMounted)
      }

      if (isMounted) setIsLoading(false)
    }

    void initSession()

    return () => {
      isMounted = false
    }
  }, [refreshSession])

  useEffect(() => {
    const handleSessionExpired = () => {
      clearAuthToken()
      setIsAuthenticated(false)
    }

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
    return () =>
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired)
  }, [])

  // Keep the context value stable so consumers update only when auth state changes.
  const value = useMemo(
    () => ({ isAuthenticated, isLoading, login, logout, refreshSession }),
    [isAuthenticated, isLoading, login, logout, refreshSession],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
