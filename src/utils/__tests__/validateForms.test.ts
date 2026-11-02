import { describe, expect, it } from 'vitest'

import type { IManagerFormValues } from '@/types'
import {
  validateContactForm,
  validateLoginCredentials,
  validateManagerForm,
} from '@/utils/validateForms'

const validManagerForm: IManagerFormValues = {
  name: 'Maria',
  email: 'maria@example.com',
  password: 'temporary-password',
  status: 'ACTIVE',
  storeId: 17,
  replacementManagerId: '',
}

describe('form validation', () => {
  it('validates login email format and maximum length', () => {
    expect(
      validateLoginCredentials({ email: 'invalid', password: 'secret' }),
    ).toEqual({ email: 'Informe um e-mail válido.' })

    expect(
      validateLoginCredentials({
        email: `${'a'.repeat(250)}@mail.com`,
        password: 'secret',
      }).email,
    ).toContain('no máximo')
  })

  it('requires valid manager data and accepts edits without a password', () => {
    expect(
      validateManagerForm(
        { ...validManagerForm, email: 'invalid' },
        false,
        false,
      ),
    ).toEqual({ email: 'Informe um e-mail válido.' })

    expect(validateManagerForm(validManagerForm, false, false)).toEqual({})
  })

  it('applies backend limits to manager password and store rules', () => {
    expect(
      validateManagerForm(
        { ...validManagerForm, password: 'short' },
        false,
        true,
      ).password,
    ).toContain('mínimo')
    expect(
      validateManagerForm(
        { ...validManagerForm, password: 'ç'.repeat(37) },
        false,
        true,
      ).password,
    ).toContain('máximo')
    expect(
      validateManagerForm(
        { ...validManagerForm, status: 'INACTIVE', storeId: '' },
        false,
        false,
      ),
    ).toEqual({})
  })

  it('validates required contact fields and their maximum lengths', () => {
    expect(validateContactForm({ problema: '  ', mensagem: '' })).toEqual({
      problema: 'Informe o problema.',
      mensagem: 'Informe a mensagem.',
    })

    expect(
      validateContactForm({ problema: 'a'.repeat(121), mensagem: 'Mensagem' })
        .problema,
    ).toContain('no máximo')
  })
})
