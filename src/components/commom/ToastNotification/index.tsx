import * as S from './styles'
import { NotificationSnackbar } from '../NotificationSnackbar'
import { type INotificationProps } from '@/types'

interface IToastNotificationProps {
  notifications: INotificationProps[]
}

const ToastNotification = ({ notifications }: IToastNotificationProps) => (
  <S.Wrapper>
    {notifications.map((notification: INotificationProps) => (
      <NotificationSnackbar
        key={notification.id || `${new Date().getTime()}`}
        message={notification.message}
        type={notification.type}
      />
    ))}
  </S.Wrapper>
)

export { ToastNotification }
