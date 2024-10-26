import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'

import { type RequestData, type ResponseData } from './types'

export const buildURL = (): string => `/api/v1/processes`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const body = {
    normalizationConfigId: requestData.normalizationConfigId,
  }

  const response = await api<ResponseData, Response<ResponseData>>(buildURL(), { method: 'post', data: body })
  return response
}
