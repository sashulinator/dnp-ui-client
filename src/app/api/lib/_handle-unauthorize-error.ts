import { type AxiosError } from 'axios'

import { CODE } from '~/slices/error'
import { invariant } from '~/utils/core'
import { isCodable } from '~/utils/error'

import { _refreshToken } from './_refresh-token'
import { api } from './api'

export async function _handleUnauthorizedError(error: AxiosError) {
  if (!isCodable(error.response?.data) || error.response?.data.code !== CODE.unathorized) throw error

  await _refreshToken()

  invariant(error.config, 'Неожиданная ошибка: Не удалось получить конфигурацию запроса.')

  return api(error?.config)
}
