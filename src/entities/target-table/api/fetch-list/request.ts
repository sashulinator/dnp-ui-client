import { Response } from '~/shared/api'
import api from '~/shared/axios'

import { baseUrl } from '../common'
import { RequestData, ResponseData } from './types'

export const buildURL = (): string => baseUrl

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
