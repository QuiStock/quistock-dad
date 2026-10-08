import { useEffect, useState } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
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
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Home from './home'
import Dashboards from '@/pages/dashboards'
import Managers from './managers'
import Profile from './profile'
import Contact from './contact'

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
          <AuthProvider>
            <Routes>
              <Route
                path="/login"
                element={
                  <AuthenticationPage title="Login" children={<LoginFlow />} />
                }
              />
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/lojas" element={<Stores />} />
                <Route path="/dashboards" element={<Dashboards />} />
                <Route path="/gerentes" element={<Managers />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/contato" element={<Contact />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>

        <ToastNotification notifications={notifications} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
