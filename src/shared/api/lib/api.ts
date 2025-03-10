import axios from 'axios'
import { stringify } from 'qs'

import { auth, api as authApi } from '~/app/auth'
import { history, publicRoutes } from '~/app/route'
import type { Response } from '~/shared/api'
import { notify } from '~/shared/notification-list-store'
import { getDateIn } from '~/slices/auth'

import { _handleUnauthorizedError } from './_handle-unauthorize-error'
import { _setAuthorizationHeader } from './_set-authorization-header'

const api = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = '*/*'

// ----------------------------

let refreshTokensPromise: null | Promise<Response<authApi.refreshTokens.ResponseData>> = null

api.interceptors.request.use(async (request) => {
  if (!auth.isAccessTokenExpired()) return _setAuthorizationHeader(request)

  if (refreshTokensPromise === null) {
    const refreshToken = auth.refreshTokenManager.get()

    if (refreshToken === null) throw new Error('Refresh token does not exist.')
    if (auth.isRefreshTokenExpired()) throw new Error('Refresh token expired.')

    refreshTokensPromise = authApi.refreshTokens.request({ refreshToken }).catch((e) => {
      history.push(publicRoutes.login.getPath())
      auth.logout()
      notify({ type: 'error', title: 'Ошибка Авторизации' })
      throw e
    })

    if (refreshTokensPromise) {
      const { data } = await refreshTokensPromise
      auth.refreshTokens({
        accessToken: data.access_token,
        // Отнимаем 5 секунд чтобы обновить чуть заранее
        accessTokenExpiresAt: getDateIn(data.expires_in - 5).getTime(),
        refreshToken: data.refresh_token,
        refreshTokenExpiresAt: getDateIn(data.refresh_expires_in - 5).getTime(),
      })
    }
  }

  if (refreshTokensPromise) {
    await refreshTokensPromise
    refreshTokensPromise = null
  }

  return _setAuthorizationHeader(request)
})

// ------------------------------

api.interceptors.response.use(undefined, _handleUnauthorizedError)

export { api }
