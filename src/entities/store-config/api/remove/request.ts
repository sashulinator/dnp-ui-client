import { RequestData, ResponseData } from './types'
import { Response } from '~/lib/api'
import api from '~/shared/axios'

export const buildURL = (requestData: RequestData): string => `/api/v1/store-configs/${requestData.keyName}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  // TODO validation

  const response = await api.delete<ResponseData, Response<ResponseData>, RequestData>(buildURL(requestData))

  return response
}
