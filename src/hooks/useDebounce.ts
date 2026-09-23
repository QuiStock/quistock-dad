import { useState, useEffect } from 'react'
import { MIN_LENGTH_TO_RUN_SEARCH } from '@/utils/constants'

const useDebounce = (value: string, delay: number, validation = true) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value.length === 0) {
        setDebouncedValue('')
      } else if (validation) {
        if (value.length >= MIN_LENGTH_TO_RUN_SEARCH) {
          setDebouncedValue(value)
        }
      } else {
        setDebouncedValue(value)
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [value, delay, validation])

  return debouncedValue
}

export default useDebounce
