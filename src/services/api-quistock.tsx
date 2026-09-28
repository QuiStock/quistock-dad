import axios from 'axios'

import type { IIdAndName, IName, IServerDerivativePagination } from '@/types'
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

export const postStore = ({ name }: IName) => {
  return axios.post(`${apiUrl}/stores`, { name })
}

export const postManager = ({ name }: IName) => {
  return axios.post(`${apiUrl}/managers`, { name })
}

export const putManager = ({
  name,
  id,
  status,
}: IIdAndName & { status?: string }) => {
  return axios.put(`${apiUrl}/manager/${id}`, { name, status })
}
