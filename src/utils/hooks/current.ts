import { RefObject, useRef } from 'react'

/**
 * Хук хранения текущего состояния
 * Избавляет от необходимости добавлять
 * приходящие из вне функции в зависимости хуков
 * @example
 * function Component({ onChange }) {
 *   const onChangeRef = useCurrent(onChange)
 *   const handleChange = useCallback(() => {
 *     // do smth
 *     onChangeRef.current(value)
 *   }, [value])
 *  // ...
 * }
 * @param value
 */
export function useCurrent<T>(value: T): RefObject<T> {
  const ref = useRef<T>(value)
  ref.current = value
  return ref
}
