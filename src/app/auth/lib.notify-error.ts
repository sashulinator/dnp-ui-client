import { notifyError as notificationNotifyError } from '~notification'

let timeoutId: null | number = null

// Функция может быть вызвана одновременно из разных слоев
// мы должны убедиться что уведомление будет показано один раз
export function notifyError() {
  if (timeoutId === null) {
    // prettier-ignore
    notificationNotifyError({ title: 'Ошибка Авторизации' })
    timeoutId = window.setTimeout(() => {
      timeoutId = null
    }, 1_000)
  }
}
