import axios from 'axios'
import { stringify } from 'qs'

import { history, publicRoutes } from '~/app/route'
import { auth } from '~/shared/auth'

import { _handleUnauthorizedError } from './_handle-unauthorize-error'
import { _setAuthorizationHeader } from './_set-authorization-header'

const api = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = '*/*'

// ----------------------------

let refreshTokensPromise: null | Promise<unknown> = null

api.interceptors.request.use(async (request) => {
  if (!auth.isAccessTokenExpired()) return _setAuthorizationHeader(request)

  if (refreshTokensPromise === null) {
    refreshTokensPromise = auth.refreshTokens().catch(() => {
      history.push(publicRoutes.login.getPath())
      auth.logout()
    })
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
