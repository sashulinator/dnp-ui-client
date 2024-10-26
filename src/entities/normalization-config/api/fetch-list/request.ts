import type { Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'

import type { RequestData, ResponseData } from './types'

export const buildURL = (): string => `/api/v1/normalization-configs`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
