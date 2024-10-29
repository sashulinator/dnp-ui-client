import axios from 'axios'
import { stringify } from 'qs'

import { history, routes } from '~dnp/app/route'
import { auth } from '~dnp/shared/auth'

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
  if (!auth.isAccessTokenExpired()) return request

  if (refreshTokensPromise === null) {
    refreshTokensPromise = auth.refreshTokens().catch(() => {
      history.push(routes.login.getPath())
    })
  }

  if (refreshTokensPromise) {
    await refreshTokensPromise
    refreshTokensPromise = null
    return request
  }

  return request
})

// ------------------------------

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
api.interceptors.request.use(_setAuthorizationHeader as any)
api.interceptors.response.use(undefined, _handleUnauthorizedError)

export { api }
