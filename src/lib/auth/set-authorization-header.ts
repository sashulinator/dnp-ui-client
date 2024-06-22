import { getAccessToken } from './get-access-token'
import { AxiosRequestConfig } from 'axios'

export function setAuthorizationHeader(request: AxiosRequestConfig<unknown>) {
  const accessToken = getAccessToken()

  if (request.headers && accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return request
}
