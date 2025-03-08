import { type AxiosRequestConfig } from 'axios'

import { auth } from '~/app/auth'

export function _setAuthorizationHeader<R extends AxiosRequestConfig<unknown>>(request: R): R {
  const accessToken = auth.accessTokenManager.get()

  if (request.headers && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
}
