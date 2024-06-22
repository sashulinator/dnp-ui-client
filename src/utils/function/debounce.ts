/**
 * Декоратор - вызов callback не более одного раза в delay миллисекунд
 * @param callback
 * @param delay
 */
export const debounce = <T extends unknown[]>(callback: (...args: T) => void, delay = 0): ((...args: T) => void) => {
  let timeoutId: NodeJS.Timeout | null
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      callback(...args)
    }, delay)
  }
}
