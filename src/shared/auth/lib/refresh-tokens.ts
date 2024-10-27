import { history, routes } from '~dnp/app/route'
import { has, invariant } from '~dnp/utils/core'

import * as refreshAccessToken from '../api/refresh-access-token'
import { globalStore } from '../models/global-store'
import { getDateIn } from './get-date-in'

export async function refreshTokens(): Promise<void> {
  const authState = globalStore.getState()
  const refreshToken = authState.refreshToken

  authState.clear()

  invariant(refreshToken, 'Неожиданная ошибка: В LocalStorage нет токена для обновления.')

  try {
    const ret = await refreshAccessToken.request({ refreshToken })
    authState.set({
      accessToken: ret.data.access_token,
      refreshToken: ret.data.refresh_token,
      accessTokenExpiresAt: getDateIn(ret.data.expires_in).toString(),
      refreshTokenExpiresAt: getDateIn(ret.data.refresh_expires_in).toString(),
    })
  } catch (error) {
    if (has(error, 'status') && (error?.status === 401 || error?.status === 400)) {
      history.push(routes.login.getPath())
    }

    throw error
  }
}
