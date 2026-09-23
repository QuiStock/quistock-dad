import type { ReactNode } from 'react'

export interface INotificationProps {
  id?: string
  message: string | ReactNode
  type: 'success' | 'info' | 'error' | 'long'
  errors?: { [key: string]: string }
}

export interface IId {
  id: number
}

export interface IIdAndName extends IId {
  name: string
}

export interface IServerDerivativePagination {
  offset?: number
  limit?: number
}
