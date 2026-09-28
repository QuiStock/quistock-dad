import { useCallback, useEffect, useState } from 'react'
import { AxiosError, type AxiosResponse } from 'axios'
import {
  useMutation,
  type UseMutationOptions,
  type UseMutationResult,
} from '@tanstack/react-query'

import emitError from '../events/emitError'
import { addSuffix, type TAddSuffix } from '../utils/addSuffix'

type FetchFunction = Promise<AxiosResponse>
type FetchFunctionNoContent = Promise<any>

type TUseSendMutationInitialProps<Res, TContext> = {
  suffix: string
} & Omit<UseMutationOptions<Res, any, FetchFunction, TContext>, 'mutationFn'>

type TResult<Res, TContext> = {
  response: Res | null
  error: { data: any } | null
  isLoading: boolean
  runFetch: (promise: Promise<AxiosResponse>) => any
  clearResponse: () => void
  clearError: () => void
  mutation: UseMutationResult<Res, AxiosError, FetchFunction, TContext>
}

type TUseSendMutationResultProps<
  Res,
  Suffix extends string,
  TContext,
> = TAddSuffix<TResult<Res, TContext>, Suffix>

export const useSendMutation = <
  Res = any,
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
  const [error, setError] = useState<{ data: any } | null>(null)

  const mutation = useMutation<Res, AxiosError, FetchFunction, TContext>({
    mutationFn: async (apiPromise: FetchFunction) => {
      const result = await apiPromise
      return result.data
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      setResponse(data)

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(data, variables, onMutateResult, context)
      }
    },
    onError: (error: any, variables, onMutateResult, context) => {
      if (!error.response) {
        const errorData = {
          data: { message: 'Erro ao realizar operação' },
        }

        emitError('Erro ao realizar operação')
        setError(errorData)
        mutationOptions?.onError?.(
          errorData,
          variables,
          onMutateResult,
          context,
        )

        return
      }

      const errorsList = error.response.data.errors
        ? error.response.data.errors
        : undefined

      setError(error.response)
      emitError(error.response.data.message, errorsList)
      mutationOptions?.onError?.(
        error.response,
        variables,
        onMutateResult,
        context,
      )
    },
    ...mutationOptions,
  })

  const runFetch = useCallback(
    (apiPromise: Promise<AxiosResponse>) => {
      if (!apiPromise) return

      mutation.mutate(apiPromise)
    },
    [mutation],
  )

  const clearResponse = useCallback(() => {
    setResponse(null)
    mutation.reset()
  }, [])

  const clearError = useCallback(() => {
    setError(null)
    mutation.reset()
  }, [])

  useEffect(() => {
    if (!mutation.data && !mutation.isError) {
      setResponse(null)
      setError(null)
    }
  }, [mutation])

  const results: TResult<Res, TContext> = {
    response,
    error,
    isLoading: mutation.isPending,
    runFetch,
    clearResponse,
    clearError,
    mutation,
  }

  const renamedResults = addSuffix(results, suffix)

  return renamedResults as TUseSendMutationResultProps<Res, Suffix, TContext>
}

export const useSendMutationNoReturnContent = <
  Res = any,
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
  const [error, setError] = useState<{ data: any } | any | null>(null)

  const mutation = useMutation<any, any, FetchFunctionNoContent, TContext>({
    mutationFn: async (apiPromise: FetchFunctionNoContent) => {
      const result = await apiPromise
      return result
    },
    onSuccess: (result, variables, onMutateResult, context) => {
      if (result.status >= 200 && result.status <= 299) setResponse(result)

      if (mutationOptions?.onSuccess) {
        mutationOptions.onSuccess(result, variables, onMutateResult, context)
      }
    },
    onError: (error: any, variables, onMutateResult, context) => {
      if (!error.response) {
        const errorData = {
          data: { message: 'Erro ao realizar operação' },
        }

        emitError('Erro ao realizar operação')
        setError(errorData)
        mutationOptions?.onError?.(
          errorData,
          variables,
          onMutateResult,
          context,
        )

        return
      }

      const errorsList = error.response.data.errors
        ? error.response.data.errors
        : undefined

      setError(error.response)
      emitError(error.response.data.message, errorsList)
      mutationOptions?.onError?.(
        error.response,
        variables,
        onMutateResult,
        context,
      )
    },
    ...mutationOptions,
  })

  const runFetch = useCallback(
    (apiPromise: Promise<AxiosResponse>) => {
      if (!apiPromise) return

      mutation.mutate(apiPromise)
    },
    [mutation],
  )

  const clearResponse = useCallback(() => {
    setResponse(null)
    mutation.reset()
  }, [])

  const clearError = useCallback(() => {
    setError(null)
    mutation.reset()
  }, [])

  useEffect(() => {
    if (!mutation.data && !mutation.isError) {
      setResponse(null)
      setError(null)
    }
  }, [mutation])

  const results: TResult<Res, TContext> = {
    response,
    error,
    isLoading: mutation.isPending,
    runFetch,
    clearResponse,
    clearError,
    mutation,
  }

  const renamedResults = addSuffix(results, suffix)

  return renamedResults as TUseSendMutationResultProps<Res, Suffix, TContext>
}
