import type { Response } from '~/shared/api'
import api from '~/shared/api'

import type { RequestData, ResponseData } from './types'

export const buildURL = ({ name }: RequestData): string => `/api/v1/stores/${name}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { name } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ name }))

  return response
}
