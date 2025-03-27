import { notify } from '~/shared/notification-list-store'

let timeoutId: null | number = null

// Функция может быть вызвана одновременно из разных слоев
// мы должны убедиться что уведомление будет показано один раз
export function notifyError() {
  if (timeoutId === null) {
    // prettier-ignore
    notify({ type: 'error', title: 'Ошибка Авторизации' })
    timeoutId = window.setTimeout(() => {
      timeoutId = null
    }, 1_000)
  }
}
