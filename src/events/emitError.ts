import emitNotification from './emitNotification'

const emitError = (message: string, errors?: { [key: string]: string }) =>
  emitNotification({
    id: `${new Date().getTime()}`,
    type: 'error',
    message,
    errors,
  })

export default emitError
