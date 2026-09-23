import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useSendQuery } from '@/hooks/useSendQuery'
import emitError from '@/events/emitError'
import { type AxiosResponse } from 'axios'

// Mock do emissor de eventos
vi.mock('@/events/emitError', () => ({
  default: vi.fn(),
}))

// Cria um wrapper com um QueryClient limpo para cada teste
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // Desabilita retries para falhar rápido nos testes de erro
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
  )
}

describe('useSendQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches data successfully and appends the suffix to the returned keys', async () => {
    const mockData = { id: 1, name: 'Test' }
    const apiPromise = vi.fn().mockResolvedValue({ data: mockData })

    const { result } = renderHook(
      () =>
        useSendQuery({
          queryKey: ['test-success'],
          apiPromise,
          suffix: 'Data',
        }),
      { wrapper: createWrapper() },
    )

    // Verifica o estado inicial de loading (com o sufixo 'Data')
    expect(result.current.isLoadingData).toBe(true)
    expect(result.current.responseData).toBeNull()

    // Aguarda a resolução da promise
    await waitFor(() => {
      expect(result.current.isLoadingData).toBe(false)
    })

    // Verifica o resultado final formatado
    expect(result.current.responseData).toEqual(mockData)
    expect(result.current.errorData).toBeNull()
    expect(apiPromise).toHaveBeenCalledOnce()
  })

  it('handles API errors with response data and emits the error correctly', async () => {
    const mockErrorResponse = {
      response: {
        data: {
          message: 'Erro de validação',
          errors: { email: 'E-mail inválido' },
        },
      },
    }
    const apiPromise = vi.fn().mockRejectedValue(mockErrorResponse)

    const { result } = renderHook(
      () =>
        useSendQuery({
          queryKey: ['test-error'],
          apiPromise,
          suffix: 'Req',
        }),
      { wrapper: createWrapper() },
    )

    await waitFor(() => {
      expect(result.current.isLoadingReq).toBe(false)
    })

    // Verifica se o erro foi formatado e salvo no state
    expect(result.current.errorReq).toEqual({
      data: mockErrorResponse.response.data,
    })

    // Verifica se a função emitError foi chamada com os parâmetros corretos
    expect(emitError).toHaveBeenCalledWith(
      'Erro de validação',
      mockErrorResponse.response.data.errors,
    )
  })

  it('handles generic errors without response data (internal error)', async () => {
    const genericError = new Error('Network fail') // Sem propriedade .response
    const apiPromise = vi.fn().mockRejectedValue(genericError)

    const { result } = renderHook(
      () =>
        useSendQuery({
          queryKey: ['test-internal-error'],
          apiPromise,
          suffix: 'Status',
        }),
      { wrapper: createWrapper() },
    )

    await waitFor(() => {
      expect(result.current.isLoadingStatus).toBe(false)
    })

    // Deve emitir "Erro interno." caso falte o objeto de response
    expect(result.current.errorStatus).toEqual({
      data: { message: 'Erro interno.' },
    })
    expect(emitError).toHaveBeenCalledWith('Erro interno.')
  })

  it('throws an error inside queryFn if no apiPromise is provided', async () => {
    // Usamos console.error mock para limpar o terminal, pois o React Query vai logar o erro
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { result } = renderHook(
      () =>
        useSendQuery({
          queryKey: ['test-no-promise'],
          apiPromise: undefined as unknown as () => Promise<AxiosResponse>, // Forçando tipo para simular uso incorreto
          suffix: 'Test',
        }),
      { wrapper: createWrapper() },
    )

    await waitFor(() => {
      expect(result.current.errorTest).not.toBeNull()
    })

    expect(emitError).toHaveBeenCalledWith('Erro interno.')

    consoleSpy.mockRestore()
  })
})
