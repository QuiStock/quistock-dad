import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import theme from '@/styles/theme'
import { ToastNotification } from '@/components/commom/ToastNotification'
import { type INotificationProps } from '@/types'
import GlobalStyles from '@/styles/globals'

// Pages
import Stores from '@/pages/stores'
import NotFound from '@/pages/404'
import { AuthenticationPage } from '@/components/auth/AuthenticationPage'
import { LoginFlow } from '@/components/auth/LoginFlow'
import Home from './home'
const queryClient = new QueryClient()

export default function App() {
  const [notifications, setNotifications] = useState<INotificationProps[]>([])

  useEffect(() => {
    const emit = (event: Event) => {
      const detail = (event as CustomEvent<INotificationProps>).detail
      setNotifications((prevNotifications) =>
        prevNotifications.findIndex((n) => n.id === detail.id) < 0
          ? [...prevNotifications, detail]
          : prevNotifications,
      )
    }

    window.addEventListener('emitNotification', emit)
    return () => window.removeEventListener('emitNotification', emit)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />

        <BrowserRouter>
          <Routes>
            <Route
              path="/auth"
              element={
                <AuthenticationPage title="Login" children={<LoginFlow />} />
              }
            />
            <Route path="/home" element={<Home />} />
            <Route path="/lojas" element={<Stores />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <ToastNotification notifications={notifications} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
