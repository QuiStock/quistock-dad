import type { INotificationProps } from '@/types'

const emitNotification = (notification: INotificationProps) => {
  let errorsMessage = ''

  if (notification.errors) {
    errorsMessage += `<b>${notification.message}</b> <br />`
    for (const [_, value] of Object.entries(notification.errors)) {
      if (value) errorsMessage += `• ${value} <br />`
    }
  }

  return dispatchEvent(
    new CustomEvent('emitNotification', {
      detail: {
        id: notification.id || `${new Date().getTime()}`,
        type: notification.type,
        message: errorsMessage
          ? errorsMessage
          : notification.message
            ? notification.message
            : '',
      },
    }),
  )
}

export default emitNotification
