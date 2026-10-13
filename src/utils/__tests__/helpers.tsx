import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, type RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/AuthProvider'

import theme from '@/styles/theme'

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

export const renderWithTheme = (children: React.ReactNode): RenderResult => {
  const queryClient = createTestQueryClient()

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}
