import type { ReactNode } from 'react'
import * as S from './styles'

interface INotificationsCard {
  icon: ReactNode
  message: string
  date: string
}

export const NotificationsCard = ({
  icon,
  message,
  date,
}: INotificationsCard) => {
  return (
    <S.CardContainer>
      <S.LeftContent>
        {icon}
        <S.Message>{message}</S.Message>
      </S.LeftContent>
      <S.DateText>{date}</S.DateText>
    </S.CardContainer>
  )
}
