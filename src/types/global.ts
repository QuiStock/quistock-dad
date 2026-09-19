export interface INotificationProps {
  id?: string
  message: string
  type: 'success' | 'info' | 'error' | 'long'
  errors?: { [key: string]: string }
}
