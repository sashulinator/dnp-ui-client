import { AxiosError } from 'axios'

import api from '~/shared/axios'

import { isAxiosError, isUnauthorized } from '../api'
import { refreshAccessTokenFn } from './refresh-token'

let refreshPromise: null | Promise<unknown> = null

export async function handleUnauthorizedError(error: unknown | AxiosError, url: string) {
  if (!isAxiosError(error)) {
    return Promise.reject(error)
  }

  if (isUnauthorized(error) && !refreshPromise) {
    refreshPromise = refreshAccessTokenFn(url)
  }

  if (refreshPromise) {
    await refreshPromise
    refreshPromise = null
    return api(error?.config as any)
  }

  return Promise.reject(error)
}
