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
  // @ts-expect-error InputProps is in the union variants but not the base type
  InputProps,
  ...props
}: ITextInputWithIconProps) => (
  <S.Wrapper
    {...props}
    // @ts-expect-error styled-components types lose the discriminated union
    InputProps={{
      ...(InputProps as Partial<InputBaseProps>),
      endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
    }}
  />
)

export { TextInputWithIcon }
