import { useEffect, useRef } from 'react'

/**
 * Хук хранения предыдущего состояния
 * @param value
 * @param initValue
 */
export const usePrevious = <T, P extends T>(value: T, initValue?: P): T => {
  const ref = useRef<P>(initValue as P)

  useEffect(() => {
    ref.current = value as P
  })

  return ref.current
}
