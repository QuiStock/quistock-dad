export const buildQueryParams = (params: Record<string, any>): string => {
  const queryParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' && value.trim() === '') return
    if (typeof value === 'number' && isNaN(value)) return
    if (![null, undefined].includes(value)) queryParams.set(key, value)
  })

  const queryString = queryParams.toString()

  return queryString ? `?${queryString}` : ''
}
