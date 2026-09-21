import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import theme from '@/styles/theme'
import { ToastNotification } from '@/components/commom/ToastNotification'
import { type INotificationProps } from '@/types'
import GlobalStyles from '@/styles/globals'
import NotFound from './404'

export default function App() {
  const [notifications, setNotifications] = useState<INotificationProps[]>([])

  useEffect(() => {
    const emit = (event: any) => {
      setNotifications((prevNotifications: INotificationProps[]) =>
        prevNotifications.findIndex((n) => n.id === event.detail.id) < 0
          ? [...prevNotifications, event.detail]
          : prevNotifications
      )
    }

    window.addEventListener('emitNotification', emit)
  }, [notifications])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <NotFound />
      <ToastNotification notifications={notifications} />
    </ThemeProvider>
  )
}
