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
  payload?: string
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
const PASSWORD_MAX_LENGTH = 128
const MANAGER_NAME_MAX_LENGTH = 150
const MANAGER_EMAIL_MAX_LENGTH = 255
const MANAGER_PASSWORD_MIN_LENGTH = 8
const MANAGER_PASSWORD_MAX_BYTES = 72
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

const validateEmail = (
  value: string,
  maxLength = EMAIL_MAX_LENGTH,
): string | undefined => {
  const email = value.trim()
  const requiredOrLengthError = validateRequiredText(
    email,
    'o e-mail',
    maxLength,
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

const validateManagerPassword = (
  value: string,
  required: boolean,
): string | undefined => {
  if (!required) return undefined
  if (!value.trim()) return 'Informe a senha inicial.'
  if (value.length < MANAGER_PASSWORD_MIN_LENGTH)
    return `A senha deve ter no mínimo ${MANAGER_PASSWORD_MIN_LENGTH} caracteres.`
  if (new TextEncoder().encode(value).length > MANAGER_PASSWORD_MAX_BYTES)
    return `A senha deve ter no máximo ${MANAGER_PASSWORD_MAX_BYTES} caracteres.`
  return undefined
}

const isPositiveInteger = (value: number) =>
  Number.isInteger(value) && value > 0

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
  const nameError = validateRequiredText(
    form.name,
    'o nome',
    MANAGER_NAME_MAX_LENGTH,
  )
  const emailError = validateEmail(form.email, MANAGER_EMAIL_MAX_LENGTH)
  const passwordError = validateManagerPassword(form.password, requiresPassword)
  if (nameError) errors.name = nameError
  if (emailError) errors.email = emailError
  if (passwordError) errors.password = passwordError

  if (form.status === 'ACTIVE' && form.storeId === '')
    errors.storeId = 'Selecione uma filial.'
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

const validateOptionalName = (name: string | undefined) =>
  name === undefined
    ? undefined
    : validateRequiredText(name, 'o nome', MANAGER_NAME_MAX_LENGTH)

const validateOptionalEmail = (email: string | undefined) =>
  email === undefined
    ? undefined
    : validateEmail(email, MANAGER_EMAIL_MAX_LENGTH)

// store_id is only accepted when the resulting status is ACTIVE.
const validateStoreChange = (payload: IUpdateManagerPayload) => {
  if (payload.store_id === undefined) return undefined
  if (!isPositiveInteger(payload.store_id))
    return 'Selecione uma filial válida.'
  if (payload.status === 'INACTIVE')
    return 'A filial não pode ser alterada ao inativar o gerente.'
  return undefined
}

// replacement_manager_id is only accepted together with status INACTIVE.
const validateReplacementChange = (payload: IUpdateManagerPayload) => {
  if (payload.replacement_manager_id === undefined) return undefined
  if (!isPositiveInteger(payload.replacement_manager_id))
    return 'Selecione um gerente substituto válido.'
  if (payload.status !== 'INACTIVE')
    return 'O gerente substituto só pode ser informado ao inativar o gerente.'
  return undefined
}

export const validateManagerUpdatePayload = (
  payload: IUpdateManagerPayload,
): IManagerUpdateValidationErrors => {
  const hasChanges = Object.values(payload).some((value) => value !== undefined)
  if (!hasChanges) return { payload: 'Nenhuma alteração para salvar.' }

  const errors: IManagerUpdateValidationErrors = {
    name: validateOptionalName(payload.name),
    email: validateOptionalEmail(payload.email),
    store_id: validateStoreChange(payload),
    replacement_manager_id: validateReplacementChange(payload),
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, value]) => value !== undefined),
  )
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
