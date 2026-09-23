import { useCallback, useMemo } from 'react'
import { type AxiosError, type AxiosResponse } from 'axios'
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query'

import emitError from '@/events/emitError'
import { addSuffix, type TAddSuffix } from '@/utils/addSuffix'

interface IErrorResponseData {
  message: string
  errors?: { [key: string]: string }
}

interface IUseSendQueryInitialProps<Res> {
  queryKey: unknown[]
  apiPromise: () => Promise<AxiosResponse>
  suffix: string
  options?: Omit<
    UseQueryOptions<Res, AxiosError<IErrorResponseData>>,
    'queryKey' | 'queryFn' | 'enabled'
  >
}

type TResult<Res> = {
  response: Res | null
  error: { data: IErrorResponseData } | null
  isLoading: boolean
  clearResponse: () => void
  clearError: () => void
} & Omit<
  UseQueryResult<Res, AxiosError<IErrorResponseData>>,
  'data' | 'error' | 'isLoading'
>

type TUseSendQueryResultProps<Res, Suffix extends string> = TAddSuffix<
  TResult<Res>,
  Suffix
>

export const useSendQuery = <Res = unknown, Suffix extends string = string>({
  queryKey,
  apiPromise,
  suffix,
  options,
}: IUseSendQueryInitialProps<Res>): TUseSendQueryResultProps<Res, Suffix> => {
  const { data, error, isLoading, ...queryRest } = useQuery<
    Res,
    AxiosError<IErrorResponseData>
  >({
    queryKey,
    queryFn: async () => {
      if (!apiPromise) throw new Error('No API promise provided')

      const result = await apiPromise()
      return result.data as Res
    },
    ...options,
  })

  // Derive response and error directly instead of duplicating into state
  const response = data ?? null

  const err = useMemo(() => {
    if (!error) return null

    if (!error.response) {
      emitError('Erro interno.')
      return { data: { message: 'Erro interno.' } }
    }

    const responseData = error.response.data
    const errorsList = responseData?.errors

    emitError(responseData?.message ?? 'Erro desconhecido.', errorsList)
    return { data: responseData }
  }, [error])

  const clearResponse = useCallback(() => {
    // Response is derived from react-query's data — clearing is handled via query invalidation
  }, [])

  const clearError = useCallback(() => {
    // Error is derived from react-query's error — clearing is handled via query invalidation
  }, [])

  const results: TResult<Res> = {
    response,
    error: err,
    isLoading,
    clearResponse,
    clearError,
    ...queryRest,
  }

  const renamedResults = addSuffix(results, suffix)

  return renamedResults as TUseSendQueryResultProps<Res, Suffix>
}
