import { useId } from 'react'
import { type TextFieldProps } from '@mui/material'
import * as S from './styles'

const TextInputComponent = ({
  id,
  slotProps,
  error,
  ...props
}: TextFieldProps) => {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const helperSlot = slotProps?.formHelperText as object | undefined

  return (
    <S.TextInput
      {...props}
      id={inputId}
      error={error}
      slotProps={{
        ...slotProps,
        formHelperText: {
          ...helperSlot,
          ...(error ? { role: 'alert' } : {}),
        },
      }}
    />
  )
}

export { TextInputComponent }
