import React, { useState } from 'react'
import * as S from './styles'

export const ContactPartial = () => {
  const [problema, setProblema] = useState('')
  const [mensagem, setMensagem] = useState('')

  const isFormValid = problema && mensagem

  const handleSubmit = () => {
    const mailtoLink = `mailto:quistockinterdisciplinar@gmail.com?subject=${encodeURIComponent(
      problema
    )}&body=${encodeURIComponent(
      `${mensagem}`
    )}`
    window.location.href = mailtoLink
  }

  return (
    <S.Wrapper>
      <S.FormContainer>
        <S.UserInput
          label="Problema"
          placeholder="Ex: Não consigo ver os dados da minha região"
          value={problema}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProblema(e.target.value)}
        />
        <S.UserInput
          label="Mensagem"
          placeholder="Descreva o problema para a gente"
          value={mensagem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMensagem(e.target.value)}
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
