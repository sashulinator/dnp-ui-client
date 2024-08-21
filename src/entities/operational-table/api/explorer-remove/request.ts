import { baseUrl } from '../common'
import { type RequestData, type ResponseData } from './types'
import { type Response } from '~/lib/api'
import api from '~/shared/axios'

export const buildURL = (): string => `${baseUrl}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'DELETE',
    data: requestData,
  })

  return response
}
