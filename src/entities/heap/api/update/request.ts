import { type Response } from '~/shared/api'
import api from '~/shared/api'

import type { Heap } from '../../models'

export const keyName = `Heap.update`

export type RequestData = Heap

export type ResponseData = Heap

export const buildURL = ({ name }: RequestData): string => `/api/v1/heaps/${name}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>>(buildURL(requestData), requestData)

  return response
}
