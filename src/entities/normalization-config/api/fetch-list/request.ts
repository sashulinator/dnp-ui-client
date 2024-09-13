import { Response } from '~/shared/api'
import api from '~/shared/axios'

import { RequestData, ResponseData } from './types'

export const buildURL = (): string => `/api/v1/normalization-configs`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
