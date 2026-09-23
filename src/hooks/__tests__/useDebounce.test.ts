import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'

import useDebounce from '@/hooks/useDebounce'

// Mock da constante para garantir estabilidade no teste
vi.mock('@/utils/constants', () => ({
  MIN_LENGTH_TO_RUN_SEARCH: 3,
}))

describe('useDebounce', () => {
  beforeEach(() => {
    // Intercepta os temporizadores do navegador (setTimeout)
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Restaura o comportamento normal após cada teste
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500))
    expect(result.current).toBe('initial')
  })

  it('updates the value only after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'init', delay: 500 } },
    )

    // Atualiza a prop (comprimento >= 3 para passar na validação)
    rerender({ value: 'updated', delay: 500 })

    // O valor não deve mudar imediatamente
    expect(result.current).toBe('init')

    // Avança o tempo em 499ms
    act(() => {
      vi.advanceTimersByTime(499)
    })
    expect(result.current).toBe('init')

    // Avança o restante do tempo para fechar os 500ms
    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe('updated')
  })

  it('does NOT update if value length is below minimum and validation is TRUE', () => {
    const { result, rerender } = renderHook(
      ({ value, delay, validation }) => useDebounce(value, delay, validation),
      { initialProps: { value: 'start', delay: 500, validation: true } },
    )

    // "ab" tem tamanho 2, o mínimo é 3
    rerender({ value: 'ab', delay: 500, validation: true })

    act(() => {
      vi.runAllTimers()
    })

    // O valor deve permanecer o original ignorando o "ab"
    expect(result.current).toBe('start')
  })

  it('updates if value length is below minimum but validation is FALSE', () => {
    const { result, rerender } = renderHook(
      ({ value, delay, validation }) => useDebounce(value, delay, validation),
      { initialProps: { value: 'start', delay: 500, validation: false } },
    )

    // "ab" tem tamanho 2, mas validation = false permite
    rerender({ value: 'ab', delay: 500, validation: false })

    act(() => {
      vi.runAllTimers()
    })

    // O valor deve ser atualizado
    expect(result.current).toBe('ab')
  })

  it('clears the value if the new string is empty, regardless of validation', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'start', delay: 500 } },
    )

    rerender({ value: '', delay: 500 })

    act(() => {
      vi.runAllTimers()
    })

    expect(result.current).toBe('')
  })
})
