export const buildQueryParams = (params: Record<string, unknown>): string => {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim() === '') return
    if (typeof value === 'number' && isNaN(value)) return
    if (![null, undefined].includes(value as null | undefined)) {
      queryParams.set(key, String(value))
    }
  })

  const queryString = queryParams.toString()

  return queryString ? `?${queryString}` : ''
}
