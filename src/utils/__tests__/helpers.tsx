import React from 'react'
import { ThemeProvider } from 'styled-components'
import { render, type RenderResult } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthProvider'

import theme from '@/styles/theme'

export const renderWithTheme = (children: React.ReactNode): RenderResult =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </MemoryRouter>,
  )
