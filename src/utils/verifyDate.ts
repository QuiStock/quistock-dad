import { add } from 'date-fns'

const verifyDate = (value: Date | string | null | undefined) => {
  if (!value) return undefined

  return add(new Date(value), { hours: 3 })
}

export default verifyDate
