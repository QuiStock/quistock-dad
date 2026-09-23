import { describe, expect, it } from 'vitest'
import { addSuffix } from '@/utils/addSuffix'

describe('addSuffix', () => {
  it('adds the suffix to all keys in a standard object', () => {
    const input = {
      name: 'John',
      lastName: 'Doe',
    }

    const result = addSuffix(input, 'Suffix')

    expect(result).toEqual({
      nameSuffix: 'John',
      lastNameSuffix: 'Doe',
    })
  })

  it('preserves the original values of different types', () => {
    const input = {
      text: 'string',
      number: 42,
      boolean: true,
      nestedObject: { key: 'value' },
      array: [1, 2, 3],
    }

    const result = addSuffix(input, '_test')

    expect(result).toEqual({
      text_test: 'string',
      number_test: 42,
      boolean_test: true,
      nestedObject_test: { key: 'value' },
      array_test: [1, 2, 3],
    })
  })

  it('returns an empty object if the input is empty', () => {
    const result = addSuffix({}, '_empty')

    expect(result).toEqual({})
  })

  it('returns the same object keys if the suffix is an empty string', () => {
    const input = {
      keyOne: 1,
      keyTwo: 2,
    }

    const result = addSuffix(input, '')

    expect(result).toEqual({
      keyOne: 1,
      keyTwo: 2,
    })
  })

  it('validates TypeScript inference (Type level test)', () => {
    const input = { a: 1, b: 2 }
    const result = addSuffix(input, 'X')

    // Se a tipagem falhar, o build do TS falhará aqui.
    // Isso garante que o tipo TAddSuffix está funcionando corretamente.
    const typeCheck: { aX: number; bX: number } = result

    expect(typeCheck.aX).toBe(1)
    expect(typeCheck.bX).toBe(2)
  })
})
