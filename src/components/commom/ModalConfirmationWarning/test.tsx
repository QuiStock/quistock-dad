import { renderWithTheme } from '@/utils/__tests__/helpers'
import { screen } from '@testing-library/react'
import { ModalConfirmationWarning } from '.'

describe('<ModalConfirmationWarning />', () => {
  it('Should render the common version', () => {
    renderWithTheme(
      <ModalConfirmationWarning
        openModal={true}
        onConfirm={() => {}}
        onCancel={() => {}}
        message="teste"
      />,
    )

    expect(screen.getByText('Confirmação')).toBeInTheDocument()
    expect(screen.getByText('teste')).toBeInTheDocument()
  })

  it('Should render the important version', () => {
    renderWithTheme(
      <ModalConfirmationWarning
        openModal={true}
        onConfirm={() => {}}
        onCancel={() => {}}
        isImportant
        message="teste"
      />,
    )

    expect(screen.getByText('Aviso importante')).toBeInTheDocument()
    expect(screen.getByText('teste')).toBeInTheDocument()
  })

  it('Should render the alert version', () => {
    renderWithTheme(
      <ModalConfirmationWarning
        openModal={true}
        onConfirm={() => {}}
        onCancel={() => {}}
        isAlert
        message="teste"
      />,
    )

    expect(screen.getByText('Alerta!')).toBeInTheDocument()
    expect(screen.getByText('teste')).toBeInTheDocument()
  })
})
