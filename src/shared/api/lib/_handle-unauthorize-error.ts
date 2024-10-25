import { type AxiosError } from 'axios'

import { refreshTokens } from '~/shared/auth'
import { invariant } from '~/utils/core'

import { api } from './api'

let refreshTokensPromise: null | Promise<unknown> = null

export async function _handleUnauthorizedError(error: AxiosError) {
  if (error.response?.status !== 401) throw error

  if (refreshTokensPromise === null) {
    refreshTokensPromise = refreshTokens()
  }

  if (refreshTokensPromise) {
    await refreshTokensPromise
    refreshTokensPromise = null
    invariant(error.config, 'Неожиданная ошибка: Не удалось получить конфигурацию запроса.')
    return api(error?.config)
  }
}
