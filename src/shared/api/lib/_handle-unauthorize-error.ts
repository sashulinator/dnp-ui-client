import { type AxiosError } from 'axios'

import { auth } from '~/app/auth'
import { history, publicRoutes } from '~/app/route'
import { notify } from '~/shared/notification-list-store'
import { CODE } from '~/slices/error'
import { invariant } from '~/utils/core'
import { isCodable } from '~/utils/error'

import { api } from './api'

let refreshTokensPromise: null | Promise<unknown> = null

let tryCount = 0

export async function _handleUnauthorizedError(error: AxiosError) {
  if (isCodable(error.response?.data) && error.response?.data.code !== CODE.unathorized) throw error

  if (refreshTokensPromise === null) {
    refreshTokensPromise = auth.refreshTokens().catch(() => {
      tryCount++
      if (tryCount > 2) {
        history.push(publicRoutes.login.getPath())
        auth.logout()
        notify({ type: 'error', title: 'Ошибка Авторизации' })
        tryCount = 0
        throw error
      }
    })
  }

  if (refreshTokensPromise) {
    await refreshTokensPromise
    refreshTokensPromise = null
    invariant(error.config, 'Неожиданная ошибка: Не удалось получить конфигурацию запроса.')
    return api(error?.config)
  }
}
