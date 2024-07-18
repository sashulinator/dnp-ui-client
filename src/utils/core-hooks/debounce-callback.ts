import { useCallback, useRef } from 'react'

import { useCurrent } from './current'

/**
 * Хук для создания функции с задержкой времени вызова.
 * Функция вызывается только спустя указанный промежуток времени после последнего вызова.
 *
 * @template T - Массив типов аргументов функции, переданных позже.
 *
 * @param {(...args: T) => void} cb - Функция, которая будет вызываться с задержкой во времени.
 * @param {number} [delay=0] - Время задержки (в миллисекундах) перед вызовом функции.
 *
 * @returns {[...args: T] => void, () => void} - Массив с двумя функциями: первая - вызовов колбэка с задержкой, вторая - отмена вызова колбэка
 */
export function useDebounceCallback<T extends unknown[]>(cb: (...args: T) => void, delay = 0) {
  const timeoutIdRef = useRef<null | number>(null)
  const cbRef = useCurrent(cb)

  const emit: (...args: T) => void = useCallback(
    (...args) => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current)
      }
      timeoutIdRef.current = window.setTimeout(() => {
        timeoutIdRef.current = null
        cbRef.current?.(...args)
      }, delay)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [delay]
  )

  const clear = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current)
    }
  }, [])

  return [emit, clear]
}
