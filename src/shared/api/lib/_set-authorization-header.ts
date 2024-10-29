import { type AxiosRequestConfig } from 'axios'

import { auth } from '~dnp/shared/auth'

export function _setAuthorizationHeader(request: AxiosRequestConfig<unknown>) {
  const accessToken = auth.tokenizer.accessToken

  if (request.headers && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
}
