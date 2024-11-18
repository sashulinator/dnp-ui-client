import type { Response } from '~/shared/api'
import api from '~/shared/api'

import type { ResponseData } from './types'

export const buildURL = (): string => `api/v1/analytical-actions/find-many`

export async function request(): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>>(buildURL())

  return response
}
