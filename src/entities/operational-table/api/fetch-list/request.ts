import { Response } from '~/lib/api'
import api from '~/old-shared/axios'

import { url } from '../common'
import { RequestData, ResponseData } from './types'

export const buildURL = (): string => url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
