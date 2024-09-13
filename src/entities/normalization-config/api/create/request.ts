import { Response } from '~/lib/api'
import api from '~/old-shared/axios'

import { RequestData, ResponseData } from './types'

export const buildURL = (): string => `/api/v1/normalization-configs`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
