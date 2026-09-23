import type { INotificationProps } from '@/types'

const emitNotification = (notification: INotificationProps) => {
  let finalMessage = notification.message

  if (notification.errors) {
    finalMessage = (
      <>
        <b>{notification.message}</b>
        <br />
        {Object.entries(notification.errors).map(([field, value]) => {
          if (!value) return null
          return (
            <span key={field}>
              • {String(value)} <br />
            </span>
          )
        })}
      </>
    )
  }

  return dispatchEvent(
    new CustomEvent('emitNotification', {
      detail: {
        id: notification.id || `${new Date().getTime()}`,
        type: notification.type,
        message: finalMessage || '',
      },
    }),
  )
}

export default emitNotification
