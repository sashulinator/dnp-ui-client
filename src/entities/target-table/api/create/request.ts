import { type Response } from '~/shared/api'
import api from '~/shared/api'

import { url } from '../common'
import { type RequestData, type ResponseData } from './types'

export const buildURL = (): string => url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
