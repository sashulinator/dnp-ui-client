import { type Response } from '~/lib/api'
import api from '~/old-shared/axios'

import { baseUrl } from '../common'
import { type RequestData, type ResponseData } from './types'

export const buildURL = (): string => baseUrl

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
