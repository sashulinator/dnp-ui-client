import { baseUrl } from '../common'
import { RequestData, ResponseData } from './types'
import { Response } from '~/lib/api'
import api from '~/shared/axios'

export const buildURL = (): string => baseUrl

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
