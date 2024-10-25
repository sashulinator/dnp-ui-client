import { history, routes } from '~/app/route'
import { has, invariant } from '~/utils/core'

import * as refreshAccessToken from './api/refresh-access-token'
import { getRefreshToken } from './get-refresh-token'
import { removeAllTokens } from './remove-all-tokens'
import { setAccessToken } from './set-access-token'
import { setAccessTokenExpiresAt } from './set-access-token-expires-at'
import { setRefreshToken } from './set-refresh-token'
import { setRefreshTokenExpiresAt } from './set-refresh-token-expires-at'

export async function refreshTokens(): Promise<void> {
  const refreshToken = getRefreshToken()
  removeAllTokens()

  invariant(refreshToken, 'Неожиданная ошибка: В LocalStorage нет токена для обновления.')

  try {
    const ret = await refreshAccessToken.request({ refreshToken })
    setAccessToken(ret.data.access_token)
    setRefreshToken(ret.data.refresh_token)
    setAccessTokenExpiresAt(ret.data.expires_in)
    setRefreshTokenExpiresAt(ret.data.refresh_expires_in)
  } catch (error) {
    if (has(error, 'status') && (error?.status === 401 || error?.status === 400)) {
      history.push(routes.login.getPath())
    }

    throw error
  }
}
