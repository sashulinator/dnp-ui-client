import { type AxiosRequestConfig } from 'axios'

import { auth } from '~/app/auth'

import { _refreshToken } from './_refresh-token'

export async function _setAuthorizationHeader<R extends AxiosRequestConfig<unknown>>(request: R): Promise<R> {
  if (auth.isAccessTokenExpired()) await _refreshToken()

  const accessToken = auth.accessTokenManager.get()

  if (request.headers && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
}
