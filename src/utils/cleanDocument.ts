import type { ChangeEvent } from 'react'

export function cleanDocument(event: ChangeEvent<HTMLInputElement>): string {
  const cleanValue = event.target.value
    ?.replace(/^0-9/g, '')
    ?.replace('-', '')
    ?.replaceAll('.', '')

  return cleanValue
}
