import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { renderWithTheme } from '@/utils/__tests__/helpers'
import { BoxLogin } from '.'

describe('<BoxLogin />', () => {
  it('should render the login inputs and button correctly', () => {
    renderWithTheme(<BoxLogin />)

    expect(screen.getByText('Entre agora!')).toBeInTheDocument()
    expect(
      screen.getByText('Por favor, insira suas credenciais.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument()
  })

  it('should allow typing in email and password fields', () => {
    renderWithTheme(<BoxLogin />)

    const emailInput = screen.getByLabelText(/e-mail/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    expect(emailInput).toHaveValue('test@example.com')

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    expect(passwordInput).toHaveValue('password123')
  })

  it('should toggle password visibility', () => {
    renderWithTheme(<BoxLogin />)

    const passwordInput = screen.getByLabelText(/senha/i)
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Find the IconButton by looking for the specific icon inside it
    const toggleIcon = screen.getByTestId('VisibilityIcon')
    const toggleButton = toggleIcon.closest('button')!

    fireEvent.click(toggleButton)

    expect(passwordInput).toHaveAttribute('type', 'text')

    // After clicking once, the icon changes to VisibilityOffIcon
    const toggleIconOff = screen.getByTestId('VisibilityOffIcon')
    const toggleButtonOff = toggleIconOff.closest('button')!

    fireEvent.click(toggleButtonOff)
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should call setVerifiedUser and setUserDocument on submit', async () => {
    const setUserDocument = vi.fn()
    const setVerifiedUser = vi.fn()

    renderWithTheme(
      <BoxLogin
        setUserDocument={setUserDocument}
        setVerifiedUser={setVerifiedUser}
      />,
    )

    const emailInput = screen.getByLabelText(/e-mail/i)
    const passwordInput = screen.getByLabelText(/senha/i)
    const submitButton = screen.getByRole('button', { name: /entrar/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    await waitFor(() => expect(submitButton).not.toBeDisabled())
    fireEvent.click(submitButton)

    // Wait for the login async function to complete and call the mocks
    await waitFor(() => {
      expect(setUserDocument).toHaveBeenCalledWith('test@example.com')
      expect(setVerifiedUser).toHaveBeenCalledWith(true)
    })
  })

  it('should call handleLogin when Enter is pressed on password field', async () => {
    const setUserDocument = vi.fn()
    const setVerifiedUser = vi.fn()

    renderWithTheme(
      <BoxLogin
        setUserDocument={setUserDocument}
        setVerifiedUser={setVerifiedUser}
      />,
    )

    const emailInput = screen.getByLabelText(/e-mail/i)
    const passwordInput = screen.getByLabelText(/senha/i)

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })

    const submitButton = screen.getByRole('button', { name: /entrar/i })
    await waitFor(() => expect(submitButton).not.toBeDisabled())

    fireEvent.keyDown(passwordInput, { key: 'Enter', code: 'Enter' })

    await waitFor(() => {
      expect(setUserDocument).toHaveBeenCalledWith('test@example.com')
      expect(setVerifiedUser).toHaveBeenCalledWith(true)
    })
  })
})
