import type { ReactNode } from 'react'
import { ErrorOutlined } from '@mui/icons-material'

import * as S from './styles'

interface IDetailItemProps {
  icon: ReactNode
  label: string
  children: ReactNode
}

const DetailItem = ({ icon, label, children }: IDetailItemProps) => (
  <S.DetailItem>
    {icon}
    <S.DetailLabel>{label}</S.DetailLabel>
    <S.DetailValue>{children}</S.DetailValue>
  </S.DetailItem>
)

interface IDetailFeedbackProps {
  title: string
  message: string
}

const DetailFeedback = ({ title, message }: IDetailFeedbackProps) => (
  <S.Feedback role="alert">
    <ErrorOutlined aria-hidden="true" />
    <div>
      <strong>{title}</strong>
      <p>{message}</p>
    </div>
  </S.Feedback>
)

export { DetailItem, DetailFeedback }
