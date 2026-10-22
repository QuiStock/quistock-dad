import { useState, type ChangeEvent } from 'react'
import * as S from './styles'

import { buildSupportMailto } from '@/utils/buildSupportMailto'
import { validateContactForm } from '@/utils/validateForms'

interface IContactForm {
  problema: string
  mensagem: string
}

const INITIAL_FORM: IContactForm = { problema: '', mensagem: '' }

export const ContactPartial = () => {
  const [form, setForm] = useState<IContactForm>(INITIAL_FORM)

  const validationErrors = validateContactForm(form)
  const isFormValid = Object.keys(validationErrors).length === 0

  const handleFieldChange =
    (field: keyof IContactForm) => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      setForm((prev) => ({ ...prev, [field]: value }))
    }

  const handleSubmit = () => {
    if (!isFormValid) return
    window.location.assign(
      buildSupportMailto(form.problema.trim(), form.mensagem.trim()),
    )
  }

  return (
    <S.Wrapper>
      <S.FormContainer>
        <S.UserInput
          label="Problema"
          placeholder="Ex: Não consigo ver os dados da minha região"
          value={form.problema}
          error={Boolean(form.problema) && Boolean(validationErrors.problema)}
          helperText={form.problema ? validationErrors.problema : undefined}
          slotProps={{ htmlInput: { maxLength: 120 } }}
          onChange={handleFieldChange('problema')}
        />
        <S.UserInput
          label="Mensagem"
          placeholder="Descreva o problema para a gente"
          value={form.mensagem}
          error={Boolean(form.mensagem) && Boolean(validationErrors.mensagem)}
          helperText={form.mensagem ? validationErrors.mensagem : undefined}
          slotProps={{ htmlInput: { maxLength: 2000 } }}
          onChange={handleFieldChange('mensagem')}
          multiline
          rows={6}
        />

        <S.SubmitButton onClick={handleSubmit} disabled={!isFormValid}>
          Enviar
        </S.SubmitButton>
      </S.FormContainer>
    </S.Wrapper>
  )
}
