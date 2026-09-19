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
  let result: TDateType = null

  if (selectedDate) {
    const dateInstance = new Date(selectedDate)

    if (!isNaN(dateInstance.getTime())) {
      const year = dateInstance.getUTCFullYear()
      const month = dateInstance.getUTCMonth()
      const day = dateInstance.getUTCDate()
      const hour = dateInstance.getUTCHours()
      const minute = dateInstance.getUTCMinutes()

      const date = new Date(year, month, day, hour, minute)

      result = getDate ? date : format(date, 'dd/MM/yyyy')
    }
  }

  return result
}
