import { type ReactNode } from 'react'
import * as S from './styles'
import {
  type TextFieldProps,
  InputAdornment,
  type InputBaseProps,
} from '@mui/material'

type ITextInputWithIconProps = TextFieldProps & {
  icon: ReactNode
}

const TextInputWithIcon = ({
  icon,
  slotProps,
  ...props
}: ITextInputWithIconProps) => (
  <S.Wrapper
    {...props}
    slotProps={{
      ...slotProps,
      input: {
        ...(slotProps?.input as Partial<InputBaseProps>),
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      },
    }}
  />
)

export { TextInputWithIcon }
