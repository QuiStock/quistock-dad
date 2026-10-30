import { type ReactNode, useId } from 'react'
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
  id,
  error,
  slotProps,
  ...props
}: ITextInputWithIconProps) => {
  const generatedId = useId()
  const helperSlot = slotProps?.formHelperText as object | undefined

  return (
    <S.Wrapper
      {...props}
      id={id ?? generatedId}
      error={error}
      slotProps={{
        ...slotProps,
        formHelperText: {
          ...helperSlot,
          ...(error ? { role: 'alert' } : {}),
        },
        input: {
          ...(slotProps?.input as Partial<InputBaseProps>),
          endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
        },
      }}
    />
  )
}

export { TextInputWithIcon }
