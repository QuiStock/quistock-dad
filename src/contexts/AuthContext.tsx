import { createContext, use } from 'react'

export interface IAuthContext {
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  refreshSession: () => Promise<boolean>
}

const DEFAULT_VALUE: IAuthContext = {
  isAuthenticated: false,
  isLoading: false,
  login: () => Promise.resolve(false),
  logout: () => Promise.resolve(),
  refreshSession: () => Promise.resolve(false),
}

export const AuthContext = createContext<IAuthContext>(DEFAULT_VALUE)

export const useAuth = () => use(AuthContext)
