import axios from 'axios'

import type { IServerDerivativePagination } from '@/types'
import { buildQueryParams } from '@/utils/buildQueryParams'

const apiUrl: string =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  'http://localhost:testestesteste'

export const getStoresList = ({
  name,
  offset,
  limit,
}: IServerDerivativePagination & { name?: string }) => {
  return axios.get(
    `${apiUrl}/stores${buildQueryParams({
      name: name ? encodeURIComponent(name) : undefined,
      offset,
      limit,
    })}`,
  )
}
