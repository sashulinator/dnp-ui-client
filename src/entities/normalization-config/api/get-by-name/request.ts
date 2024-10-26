import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'

import { type RequestData, type ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `/api/v1/normalization-configs/${requestData.name}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { name, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ name }), { data: body })

  return response
}
