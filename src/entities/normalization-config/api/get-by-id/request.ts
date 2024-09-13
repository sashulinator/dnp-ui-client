import { Response } from '~/lib/api'
import api from '~/old-shared/axios'

import { RequestData, ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `/api/v1/normalization-configs/${requestData.id}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { id, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ id }), { data: body })

  return response
}
