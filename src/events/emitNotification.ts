import type { INotificationProps } from '@/types'

const emitNotification = (notification: INotificationProps) => {
  let errorsMessage = ''

  if (notification.errors) {
    errorsMessage += `<b>${notification.message}</b> <br />`
    for (const value of Object.values(notification.errors)) {
      if (value) errorsMessage += `• ${value} <br />`
    }
  }

  return dispatchEvent(
    new CustomEvent('emitNotification', {
      detail: {
        id: notification.id || `${new Date().getTime()}`,
        type: notification.type,
        message: errorsMessage || notification.message || '',
      },
    }),
  )
}

export default emitNotification
