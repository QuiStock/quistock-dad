import { useCallback, useMemo, useState } from 'react'
import { AxiosError, type AxiosResponse } from 'axios'
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'

import emitError from '../events/emitError'
import { addSuffix, type TAddSuffix } from '../utils/addSuffix'

type FetchFunction = Promise<AxiosResponse>

interface AxiosErrorResponse {
  message: string
  errors?: { [key: string]: string }
}

type TUseSendMutationInitialProps<Res, TContext> = {
  suffix: string
} & Omit<
  UseMutationOptions<
    Res,
    AxiosError<AxiosErrorResponse>,
    FetchFunction,
    TContext
  >,
  'mutationFn'
>

type TResult<Res, TContext> = {
  response: Res | null
  error: { data: AxiosErrorResponse } | null
  isLoading: boolean
  runFetch: (promise: Promise<AxiosResponse>) => void
  clearResponse: () => void
  clearError: () => void
  mutation: UseMutationResult<
    Res,
    AxiosError<AxiosErrorResponse>,
    FetchFunction,
    TContext
  >
}

type TUseSendMutationResultProps<
  Res,
  Suffix extends string,
  TContext,
> = TAddSuffix<TResult<Res, TContext>, Suffix>

export const useSendMutation = <
  Res = unknown,
  Suffix extends string = string,
  TContext = unknown,
>({
  suffix,
  ...mutationOptions
}: TUseSendMutationInitialProps<Res, TContext>): TUseSendMutationResultProps<
  Res,
  Suffix,
  TContext
> => {
  const [response, setResponse] = useState<Res | null>(null)
  const [error, setError] = useState<{ data: AxiosErrorResponse } | null>(null)

  const mutation = useMutation<
    Res,
    AxiosError<AxiosErrorResponse>,
    FetchFunction,
    TContext
  >({
    mutationFn: async (apiPromise: FetchFunction) => {
      const result = await apiPromise
      return result.data as Res
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      setResponse(data)

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, onMutateResult, context)
      }
    },
    onError: (
      axiosError: AxiosError<AxiosErrorResponse>,
      variables,
      onMutateResult,
      context,
    ) => {
      if (!axiosError.response) {
        const errorData = {
          data: { message: 'Erro ao realizar operação' },
        }

        emitError('Erro ao realizar operação')
        setError(errorData)
        mutationOptions?.onError?.(
          axiosError,
          variables,
          onMutateResult,
          context,
        )

        return
      }

      const responseData = axiosError.response.data
      const errorsList = responseData.errors ?? undefined

      setError({ data: responseData })
      emitError(responseData.message, errorsList)
      mutationOptions?.onError?.(axiosError, variables, onMutateResult, context)
    },
    ...mutationOptions,
  })

  const runFetch = useCallback(
    (apiPromise: Promise<AxiosResponse>) => {
      mutation.mutate(apiPromise)
    },
    [mutation],
  )

  const clearResponse = useCallback(() => {
    setResponse(null)
    mutation.reset()
  }, [mutation])

  const clearError = useCallback(() => {
    setError(null)
    mutation.reset()
  }, [mutation])

  const results: TResult<Res, TContext> = useMemo(
    () => ({
      response,
      error,
      isLoading: mutation.isPending,
      runFetch,
      clearResponse,
      clearError,
      mutation,
    }),
    [response, error, mutation, runFetch, clearResponse, clearError],
  )

  const renamedResults = addSuffix(results, suffix)

  return renamedResults as TUseSendMutationResultProps<Res, Suffix, TContext>
}

export const useSendMutationNoReturnContent = <
  Res = unknown,
  Suffix extends string = string,
  TContext = unknown,
>({
  suffix,
  ...mutationOptions
}: TUseSendMutationInitialProps<Res, TContext>): TUseSendMutationResultProps<
  Res,
  Suffix,
  TContext
> => {
  const [response, setResponse] = useState<Res | null>(null)
  const [error, setError] = useState<{ data: AxiosErrorResponse } | null>(null)

  const mutation = useMutation<
    AxiosResponse<Res>,
    AxiosError<AxiosErrorResponse>,
    FetchFunction,
    TContext
  >({
    mutationFn: async (apiPromise: FetchFunction) => {
      const result = await apiPromise
      return result as AxiosResponse<Res>
    },
    onSuccess: (result, variables, onMutateResult, context) => {
      if (result.status >= 200 && result.status <= 299) {
        setResponse(result.data)
      }

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(
          result.data,
          variables,
          onMutateResult,
          context,
        )
      }
    },
    onError: (
      axiosError: AxiosError<AxiosErrorResponse>,
      variables,
      onMutateResult,
      context,
    ) => {
      if (!axiosError.response) {
        const errorData = {
          data: { message: 'Erro ao realizar operação' },
        }

        emitError('Erro ao realizar operação')
        setError(errorData)
        mutationOptions?.onError?.(
          axiosError,
          variables,
          onMutateResult,
          context,
        )

        return
      }

      const responseData = axiosError.response.data
      const errorsList = responseData.errors ?? undefined

      setError({ data: responseData })
      emitError(responseData.message, errorsList)
      mutationOptions?.onError?.(axiosError, variables, onMutateResult, context)
    },
  })

  const runFetch = useCallback(
    (apiPromise: Promise<AxiosResponse>) => {
      mutation.mutate(apiPromise)
    },
    [mutation],
  )

  const clearResponse = useCallback(() => {
    setResponse(null)
    mutation.reset()
  }, [mutation])

  const clearError = useCallback(() => {
    setError(null)
    mutation.reset()
  }, [mutation])

  const results: TResult<Res, TContext> = useMemo(
    () => ({
      response,
      error,
      isLoading: mutation.isPending,
      runFetch,
      clearResponse,
      clearError,
      mutation: mutation as unknown as UseMutationResult<
        Res,
        AxiosError<AxiosErrorResponse>,
        FetchFunction,
        TContext
      >,
    }),
    [response, error, mutation, runFetch, clearResponse, clearError],
  )

  const renamedResults = addSuffix(results, suffix)

  return renamedResults as TUseSendMutationResultProps<Res, Suffix, TContext>
}
