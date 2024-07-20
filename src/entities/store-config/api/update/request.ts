import { type RequestData, type ResponseData } from './types'
import { type Response } from '~/lib/api'
import api from '~/shared/axios'

export const buildURL = (): string => `/api/v1/store-configs`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
