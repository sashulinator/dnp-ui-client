import { type Response } from '~/lib/api'
import api from '~/shared/axios'

import { type RequestData, type ResponseData } from './types'

export const buildURL = (): string => `/api/v1/processes`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const body = {
    normalizationConfigId: requestData.id,
  }

  const response = await api<ResponseData, Response<ResponseData>>(buildURL(), { method: 'post', data: body })
  return response
}
