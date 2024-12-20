import { type AxiosError } from 'axios'

import { history, publicRoutes } from '~/app/route'
import { auth } from '~/shared/auth'
import { invariant } from '~/utils/core'

import { api } from './api'

let refreshTokensPromise: null | Promise<unknown> = null

export async function _handleUnauthorizedError(error: AxiosError) {
  if (error.response?.status !== 401) throw error

  if (refreshTokensPromise === null) {
    refreshTokensPromise = auth.refreshTokens().catch(() => {
      history.push(publicRoutes.login.getPath())
      auth.logout()
    })
  }

  if (refreshTokensPromise) {
    await refreshTokensPromise
    refreshTokensPromise = null
    invariant(error.config, 'Неожиданная ошибка: Не удалось получить конфигурацию запроса.')
    return api(error?.config)
  }
}
