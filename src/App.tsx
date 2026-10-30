import { lazy, Suspense, useEffect, useState } from 'react'
import { AuthProvider } from '@/contexts/AuthProvider'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import theme from '@/styles/theme'
import { ToastNotification } from '@/components/commom/ToastNotification'
import { type IEmittedNotification } from '@/types'
import GlobalStyles from '@/styles/globals'

import { AuthenticationPage } from '@/components/auth/AuthenticationPage'
import { LoginFlow } from '@/components/auth/LoginFlow'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { LoadingMask } from '@/components/commom/LoadingMask'
import { useAuth } from '@/contexts/AuthContext'

const Stores = lazy(() => import('@/pages/stores'))
const NotFound = lazy(() => import('@/pages/not-found'))
const Home = lazy(() => import('@/pages/home'))
const Dashboards = lazy(() => import('@/pages/dashboards'))
const Managers = lazy(() => import('@/pages/managers'))
const ManagerDetail = lazy(() => import('@/pages/manager-detail'))
const Profile = lazy(() => import('@/pages/profile'))
const Contact = lazy(() => import('@/pages/contact'))

const queryClient = new QueryClient()

const LoginRoute = () => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) return <LoadingMask isLoading={true} />
  if (isAuthenticated) return <Navigate to="/home" replace />

  return <AuthenticationPage title="Login" children={<LoginFlow />} />
}

export default function App() {
  const [notifications, setNotifications] = useState<IEmittedNotification[]>([])

  useEffect(() => {
    const emit = (event: Event) => {
      const detail = (event as CustomEvent<IEmittedNotification>).detail
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
            <Suspense fallback={<LoadingMask isLoading />}>
              <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/login" element={<LoginRoute />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/lojas" element={<Stores />} />
                  <Route path="/dashboards" element={<Dashboards />} />
                  <Route path="/gerentes" element={<Managers />} />
                  <Route path="/gerentes/:id" element={<ManagerDetail />} />
                  <Route path="/perfil" element={<Profile />} />
                  <Route path="/contato" element={<Contact />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>

        <ToastNotification notifications={notifications} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
