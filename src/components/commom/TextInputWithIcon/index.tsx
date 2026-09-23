import { type ReactNode } from 'react'
import * as S from './styles'
import { type TextFieldProps, InputAdornment } from '@mui/material'

type ITextInputWithIconProps = TextFieldProps & {
  icon: ReactNode
  InputProps?: any
}

const TextInputWithIcon = ({
  icon,
  InputProps,
  ...props
}: ITextInputWithIconProps) => (
  <S.Wrapper
    {...(props as any)}
    InputProps={{
      ...InputProps,
      endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
    }}
  />
)

export { TextInputWithIcon }
