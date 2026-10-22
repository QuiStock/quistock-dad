import * as S from './styles'
import { NotificationSnackbar } from '../NotificationSnackbar'
import { type IEmittedNotification } from '@/types'

interface IToastNotificationProps {
  notifications: IEmittedNotification[]
}

const ToastNotification = ({ notifications }: IToastNotificationProps) => (
  <S.Wrapper>
    {notifications.map((notification) => (
      <NotificationSnackbar
        key={notification.id}
        message={notification.message}
        type={notification.type}
      />
    ))}
  </S.Wrapper>
)

export { ToastNotification }
