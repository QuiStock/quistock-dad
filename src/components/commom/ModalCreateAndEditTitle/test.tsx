import { renderWithTheme } from '@/utils/__tests__/helpers'
import { fireEvent, screen } from '@testing-library/react'
import { ModalCreateAndEditTitle } from './index'
import { jest } from '@jest/globals'

// Mock dos componentes externos
jest.mock('@/components/commom/ButtonComponent', () => ({
  ButtonComponent: ({
    children,
    onClick,
    disabled,
    'data-testid': dataTestId,
    variant,
  }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestId}
      className={variant}
    >
      {children}
    </button>
  ),
}))

jest.mock('@/components/commom/TextInputComponent', () => ({
  TextInputComponent: ({ value, onChange, onKeyDown, label }: any) => (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={label}
      aria-label={label}
    />
  ),
}))

const mockOnCancel = jest.fn()
const mockOnSave = jest.fn()
const mockValidateContent = jest.fn()

const defaultProps = {
  open: true,
  modalTitle: 'Criar Título',
  placeholder: 'Digite o título',
  initialValue: '',
  helper: <p>Helper text for the user</p>,
  validateContent: mockValidateContent,
  onCancel: mockOnCancel,
  onSave: mockOnSave,
}

describe('<ModalCreateAndEditTitle />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockValidateContent.mockReturnValue(true)
  })

  describe('Basic rendering', () => {
    it('should render modal when open is true', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      expect(
        screen.getByTestId('modal-create-and-edit-title'),
      ).toBeInTheDocument()
    })

    it('should not render modal when open is false', () => {
      renderWithTheme(
        <ModalCreateAndEditTitle {...defaultProps} open={false} />,
      )

      expect(
        screen.queryByTestId('modal-create-and-edit-title'),
      ).not.toBeInTheDocument()
    })

    it('should display modal title', () => {
      renderWithTheme(
        <ModalCreateAndEditTitle {...defaultProps} modalTitle="Editar Nome" />,
      )

      expect(screen.getByText('Editar Nome')).toBeInTheDocument()
    })

    it('should render text input with placeholder', () => {
      renderWithTheme(
        <ModalCreateAndEditTitle
          {...defaultProps}
          placeholder="Nome do curso"
        />,
      )

      expect(screen.getByLabelText('Nome do curso')).toBeInTheDocument()
    })

    it('should render helper text', () => {
      const helperText = <span data-testid="helper">Ajuda para o usuário</span>
      renderWithTheme(
        <ModalCreateAndEditTitle {...defaultProps} helper={helperText} />,
      )

      expect(screen.getByTestId('helper')).toBeInTheDocument()
      expect(screen.getByText('Ajuda para o usuário')).toBeInTheDocument()
    })

    it('should render cancel and save buttons', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      expect(screen.getByTestId('cancel')).toBeInTheDocument()
      expect(screen.getByTestId('save')).toBeInTheDocument()
      expect(screen.getByText('Cancelar')).toBeInTheDocument()
      expect(screen.getByText('Salvar')).toBeInTheDocument()
    })
  })

  describe('Initial value handling', () => {
    it('should display initial value in input when provided', () => {
      renderWithTheme(
        <ModalCreateAndEditTitle
          {...defaultProps}
          initialValue="Valor inicial"
        />,
      )

      const input = screen.getByDisplayValue('Valor inicial')
      expect(input).toBeInTheDocument()
    })

    it('should display empty input when no initial value is provided', () => {
      renderWithTheme(
        <ModalCreateAndEditTitle {...defaultProps} initialValue="" />,
      )

      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('should update input value when user types', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'Novo texto' } })

      expect(input).toHaveValue('Novo texto')
    })
  })

  describe('Validation and button states', () => {
    it('should disable save button when validation fails', () => {
      mockValidateContent.mockReturnValue(false)
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const saveButton = screen.getByTestId('save')
      expect(saveButton).toBeDisabled()
    })

    it('should enable save button when validation passes', () => {
      mockValidateContent.mockReturnValue(true)
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const saveButton = screen.getByTestId('save')
      expect(saveButton).not.toBeDisabled()
    })

    it('should call validation function with input value', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'Test value' } })

      expect(mockValidateContent).toHaveBeenCalledWith('Test value')
    })
  })

  describe('Button interactions', () => {
    it('should call onCancel when cancel button is clicked', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const cancelButton = screen.getByTestId('cancel')
      fireEvent.click(cancelButton)

      expect(mockOnCancel).toHaveBeenCalledTimes(1)
    })

    it('should call onSave with current value when save button is clicked', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'Saved text' } })

      const saveButton = screen.getByTestId('save')
      fireEvent.click(saveButton)

      expect(mockOnSave).toHaveBeenCalledWith('Saved text')
      expect(mockOnSave).toHaveBeenCalledTimes(1)
    })

    it('should call onSave when Enter key is pressed and validation passes', () => {
      mockValidateContent.mockReturnValue(true)
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'Enter text' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(mockOnSave).toHaveBeenCalledWith('Enter text')
    })

    it('should not call onSave when Enter key is pressed and validation fails', () => {
      mockValidateContent.mockReturnValue(false)
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'Invalid text' } })
      fireEvent.keyDown(input, { key: 'Enter' })

      expect(mockOnSave).not.toHaveBeenCalled()
    })

    it('should not call onSave when other keys are pressed', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      fireEvent.change(input, { target: { value: 'Test text' } })
      fireEvent.keyDown(input, { key: 'Escape' })

      expect(mockOnSave).not.toHaveBeenCalled()
    })
  })

  describe('Modal behavior', () => {
    it('should maintain input focus when modal is open', () => {
      renderWithTheme(<ModalCreateAndEditTitle {...defaultProps} />)

      const input = screen.getByRole('textbox')
      input.focus()

      expect(document.activeElement).toBe(input)
    })

    it('should handle complex validation scenarios', () => {
      const complexValidation = (value: string) =>
        value.length >= 3 && value.includes('test')
      renderWithTheme(
        <ModalCreateAndEditTitle
          {...defaultProps}
          validateContent={complexValidation}
        />,
      )

      const input = screen.getByRole('textbox')
      const saveButton = screen.getByTestId('save')

      // Should be disabled for short text
      fireEvent.change(input, { target: { value: 'ab' } })
      expect(saveButton).toBeDisabled()

      // Should be disabled for text without 'test'
      fireEvent.change(input, { target: { value: 'abc' } })
      expect(saveButton).toBeDisabled()

      // Should be enabled for valid text
      fireEvent.change(input, { target: { value: 'test abc' } })
      expect(saveButton).not.toBeDisabled()
    })
  })
})
