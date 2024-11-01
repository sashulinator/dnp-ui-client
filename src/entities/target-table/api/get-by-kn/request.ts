import type { Response } from '~/shared/api'
import api from '~/shared/api'

import { url } from '../common'
import type { RequestData, ResponseData } from './types'

export const buildURL = (requestData: RequestData): string => `${url}/${requestData.kn}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { kn, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ kn }), { data: body })

  return response
}
