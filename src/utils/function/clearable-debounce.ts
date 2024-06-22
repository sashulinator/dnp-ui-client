/**
 * Декоратор - вызов callback не более одного раза в delay миллисекунд,
 * и функция очистки таймера - принудительное прекращение действия
 * @param callback
 * @param delay
 */
export const clearableDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delay = 0
): [(...args: T) => void, () => void] => {
  let timeoutId: number | null

  function emit(...args: T) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      timeoutId = null
      callback(...args)
    }, delay)
  }

  function clear() {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return [emit, clear]
}
