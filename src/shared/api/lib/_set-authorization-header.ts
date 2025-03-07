import { type AxiosRequestConfig } from 'axios'

import { auth } from '~/shared/auth'

export function _setAuthorizationHeader<R extends AxiosRequestConfig<unknown>>(request: R): R {
  const accessToken = auth.tokenizer.accessToken

  if (request.headers && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
}
