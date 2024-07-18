/**
 * Задает значение для HTMLInputElement
 *
 * @param {HTMLInputElement | null} inputElement - HTML-элемент input
 * @param {string} value - Значение для установки в input
 *
 * @returns {void}
 */
export function setInputValue(inputElement: HTMLInputElement | null, value: string): void {
  if (inputElement === null) {
    return
  }

  const lastValue = inputElement.value
  inputElement.value = value
  const event = new Event('input', { bubbles: true })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tracker = (inputElement as any)._valueTracker
  if (tracker) {
    tracker.setValue(lastValue)
  }
  inputElement.dispatchEvent(event)
}
