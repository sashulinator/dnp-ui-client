import { baseUrl } from '../common'
import { type RequestData, type ResponseData } from './types'
import { type Response } from '~/lib/api'
import api from '~/shared/axios'

export const buildURL = (): string => `${baseUrl}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
