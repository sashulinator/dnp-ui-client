import { auth, api as authApi, notifyError } from '~/app/auth'
import { history, publicRoutes } from '~/app/route'
import type { Response } from '~/shared/api'
import { getDateIn } from '~/slices/auth'
import { assertNotNull } from '~/utils/core'
import { BaseError } from '~/utils/error'

let refreshTokensPromise: null | Promise<Response<authApi.refreshTokens.ResponseData>> = null

export async function _refreshToken() {
  if (refreshTokensPromise === null) {
    if (auth.isRefreshTokenExpired()) {
      history.push(publicRoutes.login.getPath())
      notifyError()
      throw new Error('Refresh token is expired')
    }

    const refreshToken = auth.refreshTokenManager.get()

    if (refreshToken === null) {
      history.push(publicRoutes.login.getPath())
      notifyError()
      throw new Error("Refresh token does't exist")
    }

    refreshTokensPromise = authApi.refreshTokens.request({ refreshToken })
  }

  assertNotNull(refreshTokensPromise, 'Unexpected Error')

  try {
    const ret = await refreshTokensPromise

    auth.refreshTokens({
      accessToken: ret.data.access_token,
      // Отнимаем 5 секунд чтобы обновить чуть заранее
      accessTokenExpiresAt: getDateIn(ret.data.expires_in - 5).getTime(),
      refreshToken: ret.data.refresh_token,
      refreshTokenExpiresAt: getDateIn(ret.data.refresh_expires_in - 5).getTime(),
    })
  } catch (e) {
    notifyError()
    history.push(publicRoutes.login.getPath())
    throw new BaseError('Could not refresh token', { cause: e })
  } finally {
    refreshTokensPromise = null
  }
}
