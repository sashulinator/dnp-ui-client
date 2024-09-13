// import { notify } from '~/shared/notify'
import { isEmpty } from '~/utils/core'

/**
 * Запускает валидатор и выводит ошибки в консоль и нотификашку в ui
 */
export function validate(cb: (data: unknown) => unknown, data: unknown, name?: string): void {
  const errors = cb(data)
  if (!isEmpty(errors)) {
    // notify({ data: 'Ошибка валидации', type: 'error' })
    // eslint-disable-next-line no-console
    console.log(`validation error '${name}'`, errors)
  }
}
