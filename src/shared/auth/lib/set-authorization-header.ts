import { type AxiosRequestConfig } from 'axios'

import { globalStore } from '../models/global-store'

export function setAuthorizationHeader(request: AxiosRequestConfig<unknown>) {
  const accessToken = globalStore.getState().accessToken

  if (request.headers && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
}
