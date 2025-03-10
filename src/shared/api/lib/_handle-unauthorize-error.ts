import { type AxiosError } from 'axios'

import { auth, api as authApi } from '~/app/auth'
import { history, publicRoutes } from '~/app/route'
import type { Response } from '~/shared/api'
import { notify } from '~/shared/notification-list-store'
import { getDateIn } from '~/slices/auth'
import { CODE } from '~/slices/error'
import { invariant } from '~/utils/core'
import { isCodable } from '~/utils/error'

import { api } from './api'

let refreshTokensPromise: null | Promise<Response<authApi.refreshTokens.ResponseData>> = null

let tryCount = 0

export async function _handleUnauthorizedError(error: AxiosError) {
  if (isCodable(error.response?.data) && error.response?.data.code !== CODE.unathorized) throw error

  if (refreshTokensPromise === null) {
    const refreshToken = auth.refreshTokenManager.get()

    if (refreshToken === null) {
      history.push(publicRoutes.login.getPath())
      notify({ type: 'error', title: 'Ошибка Авторизации' })
      throw new Error("Refresh token does't exist.")
    }

    refreshTokensPromise = authApi.refreshTokens.request({ refreshToken })
  }

  if (refreshTokensPromise) {
    const ret = await refreshTokensPromise.catch(() => {
      tryCount++
      if (tryCount > 2) {
        history.push(publicRoutes.login.getPath())
        notify({ type: 'error', title: 'Ошибка Авторизации' })
        tryCount = 0
        throw error
      }
    })
    if (ret) {
      auth.refreshTokens({
        accessToken: ret.data.access_token,
        // Отнимаем 5 секунд чтобы обновить чуть заранее
        accessTokenExpiresAt: getDateIn(ret.data.expires_in - 5).getTime(),
        refreshToken: ret.data.refresh_token,
        refreshTokenExpiresAt: getDateIn(ret.data.refresh_expires_in - 5).getTime(),
      })
    }
    refreshTokensPromise = null
    invariant(error.config, 'Неожиданная ошибка: Не удалось получить конфигурацию запроса.')
    return api(error?.config)
  }
}
