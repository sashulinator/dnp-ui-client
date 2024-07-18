import { useLatest } from './latest'

export function useDebounceCb<T extends unknown[]>(cb: (...args: T) => void, delay = 0) {
  let timeoutId: number | null
  const cbRef = useLatest(cb)

  function emit(...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      timeoutId = null
      cbRef.current(...args)
    }, delay)
  }
  function clear() {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return [emit, clear]
}
