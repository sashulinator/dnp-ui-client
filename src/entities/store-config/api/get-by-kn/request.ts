import { Response } from '~dnp/shared/api'
import api from '~dnp/shared/axios'

import { RequestData, ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `/api/v1/store-configs/${requestData.kn}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { kn: keyName, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ kn: keyName }), { data: body })

  return response
}
