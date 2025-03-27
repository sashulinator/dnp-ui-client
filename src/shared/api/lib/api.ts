import axios from 'axios'
import { stringify } from 'qs'

import { auth } from '~/app/auth'

import { _handleUnauthorizedError } from './_handle-unauthorize-error'
import { _refreshToken } from './_refresh-token'
import { _setAuthorizationHeader } from './_set-authorization-header'

const api = axios.create({
  withCredentials: true,
  paramsSerializer: (params) => stringify(params, { arrayFormat: 'repeat' }),
})

api.defaults.headers.common['Content-Type'] = 'application/json'
api.defaults.headers.common['Accept'] = '*/*'

// ----------------------------

api.interceptors.request.use(async (request) => {
  if (auth.isAccessTokenExpired()) await _refreshToken()
  return _setAuthorizationHeader(request)
})

// ------------------------------

api.interceptors.response.use(undefined, _handleUnauthorizedError)

export { api }
