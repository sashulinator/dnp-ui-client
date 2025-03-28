const REDIRECT_LOCAL_STORAGE_NAME = 'redirect'

/**
 * Сохранить текущую страницу чтобы в дальнейшем вернуться на нее
 *
 * Эту функцию скорее всего запустят несколько раз из разных мест
 * поэтому сохраняем только при первом вызове, так как при последующих
 * вызовах мы уже будем находиться в нежелательном месте (скорее всего страница login)
 */
export function setReturnRedirect() {
  if (localStorage.getItem(REDIRECT_LOCAL_STORAGE_NAME)) return
  localStorage.setItem(REDIRECT_LOCAL_STORAGE_NAME, location.href)
}

/**
 * Получить страницу с которой мы развернули пользователя (скорее всего для авторизации)
 */
export function getReturnRedirect() {
  const ret = localStorage.getItem(REDIRECT_LOCAL_STORAGE_NAME)
  localStorage.removeItem(REDIRECT_LOCAL_STORAGE_NAME)
  return ret
}
