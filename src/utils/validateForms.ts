import type {
  ICreateManagerPayload,
  ILoginCredentials,
  IManagerFormValues,
  IUpdateManagerPayload,
} from '@/types'

export interface ILoginValidationErrors {
  email?: string
  password?: string
}

export interface IManagerValidationErrors {
  name?: string
  email?: string
  password?: string
  storeId?: string
  replacementManagerId?: string
}

export interface IManagerUpdateValidationErrors {
  name?: string
  email?: string
  store_id?: string
  replacement_manager_id?: string
}

export interface IContactFormValues {
  problema: string
  mensagem: string
}

export interface IContactValidationErrors {
  problema?: string
  mensagem?: string
}

const EMAIL_MAX_LENGTH = 254
const NAME_MAX_LENGTH = 100
const PASSWORD_MAX_LENGTH = 128
const CONTACT_SUBJECT_MAX_LENGTH = 120
const CONTACT_MESSAGE_MAX_LENGTH = 2000

const isValidEmail = (email: string): boolean => {
  const [localPart, domain, ...extraParts] = email.split('@')
  return (
    extraParts.length === 0 &&
    Boolean(localPart) &&
    Boolean(domain) &&
    !/\s/.test(email) &&
    domain.includes('.') &&
    !domain.startsWith('.') &&
    !domain.endsWith('.')
  )
}

const validateRequiredText = (
  value: string,
  fieldLabel: string,
  maxLength: number,
): string | undefined => {
  if (!value.trim()) return `Informe ${fieldLabel}.`
  if (value.trim().length > maxLength)
    return `${fieldLabel[0].toUpperCase()}${fieldLabel.slice(1)} deve ter no máximo ${maxLength} caracteres.`
  return undefined
}

const validateEmail = (value: string): string | undefined => {
  const email = value.trim()
  const requiredOrLengthError = validateRequiredText(
    email,
    'o e-mail',
    EMAIL_MAX_LENGTH,
  )
  if (requiredOrLengthError) return requiredOrLengthError
  if (!isValidEmail(email)) return 'Informe um e-mail válido.'
  return undefined
}

const validatePassword = (
  value: string,
  required: boolean,
): string | undefined => {
  if (required && !value.trim()) return 'Informe a senha inicial.'
  if (value.length > PASSWORD_MAX_LENGTH)
    return `A senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres.`
  return undefined
}

const validateContactField = (
  value: string,
  fieldLabel: string,
  maxLength: number,
): string | undefined => validateRequiredText(value, fieldLabel, maxLength)

export const validateLoginCredentials = (
  credentials: ILoginCredentials,
): ILoginValidationErrors => {
  const errors: ILoginValidationErrors = {}
  const emailError = validateEmail(credentials.email)
  const passwordError = validatePassword(credentials.password, true)
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  return errors
}

export const validateManagerForm = (
  form: IManagerFormValues,
  requiresReplacementManager: boolean,
  requiresPassword: boolean,
): IManagerValidationErrors => {
  const errors: IManagerValidationErrors = {}
  const nameError = validateRequiredText(form.name, 'o nome', NAME_MAX_LENGTH)
  const emailError = validateEmail(form.email)
  const passwordError = validatePassword(form.password, requiresPassword)
  if (nameError) errors.name = nameError
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  if (form.storeId === '') errors.storeId = 'Selecione uma filial.'
  if (requiresReplacementManager && form.replacementManagerId === '')
    errors.replacementManagerId = 'Selecione um gerente substituto.'

  return errors
}

export const validateManagerCreatePayload = (
  payload: ICreateManagerPayload,
): IManagerValidationErrors =>
  validateManagerForm(
    {
      ...payload,
      status: 'ACTIVE',
      replacementManagerId: '',
      storeId: payload.store_id,
    },
    false,
    true,
  )

export const validateManagerUpdatePayload = (
  payload: IUpdateManagerPayload,
): IManagerUpdateValidationErrors => {
  const errors: IManagerUpdateValidationErrors = {}
  const nameError =
    payload.name === undefined
      ? undefined
      : validateRequiredText(payload.name, 'o nome', NAME_MAX_LENGTH)
  const emailError =
    payload.email === undefined ? undefined : validateEmail(payload.email)
  if (nameError) errors.name = nameError
  if (emailError) errors.email = emailError

  if (payload.store_id !== undefined && !Number.isInteger(payload.store_id))
    errors.store_id = 'Selecione uma filial válida.'
  if (
    payload.replacement_manager_id !== undefined &&
    !Number.isInteger(payload.replacement_manager_id)
  )
    errors.replacement_manager_id = 'Selecione um gerente substituto válido.'

  return errors
}

export const validateContactForm = (
  form: IContactFormValues,
): IContactValidationErrors => {
  const errors: IContactValidationErrors = {}
  const subjectError = validateContactField(
    form.problema,
    'o problema',
    CONTACT_SUBJECT_MAX_LENGTH,
  )
  const messageError = validateContactField(
    form.mensagem,
    'a mensagem',
    CONTACT_MESSAGE_MAX_LENGTH,
  )
  if (subjectError) errors.problema = subjectError
  if (messageError) errors.mensagem = messageError

  return errors
}
