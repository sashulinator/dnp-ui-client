import { MutableRefObject, useRef } from 'react'

/**
 * Хук кеширования последнего значения
 * @param value
 */
export const useLatest = <T>(value: T): MutableRefObject<T> => {
  const ref = useRef<T>(value)
  ref.current = value

  return ref
}
