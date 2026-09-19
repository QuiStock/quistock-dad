import { format } from 'date-fns'

type TDateType = string | Date | null | undefined

export function formatInTimeZone(selectedDate: TDateType): string
export function formatInTimeZone(
  selectedDate: TDateType,
  getDate: false,
): string
export function formatInTimeZone(selectedDate: TDateType, getDate: true): Date

export function formatInTimeZone(
  selectedDate: TDateType,
  getDate?: boolean,
): TDateType {
  if (!selectedDate) return null

  const dateInstance = new Date(selectedDate)

  if (isNaN(dateInstance.getTime())) return null

  const year = dateInstance.getUTCFullYear()
  const month = dateInstance.getUTCMonth()
  const day = dateInstance.getUTCDate()
  const hour = dateInstance.getUTCHours()
  const minute = dateInstance.getUTCMinutes()

  const date = new Date(year, month, day, hour, minute)

  if (getDate) return date

  return format(date, 'dd/MM/yyyy')
}
