import { useEffect, useRef } from 'react'

/**
 * Хук хранения предыдущего состояния
 * @param value
 * @param initValue
 */
export const usePrevious = <T>(value: T, initValue?: T): T => {
  const ref = useRef<T>(initValue as T)

  useEffect(() => {
    ref.current = value as T
  })

  return ref.current
}
