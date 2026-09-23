export interface INotificationProps {
  id?: string
  message: string
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
