import { Response } from '~/lib/api'
import api from '~/old-shared/axios'

import { baseUrl } from '../common'
import { RequestData, ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `${baseUrl}/${requestData.kn}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { kn, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ kn }), { data: body })

  return response
}
