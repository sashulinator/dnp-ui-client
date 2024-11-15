import { type Response } from '~/shared/api'
import api from '~/shared/api'

import type { UpdateStoreSchema } from '../../models'

export const keyName = `Store.update`

export type RequestData = UpdateStoreSchema

export type ResponseData = UpdateStoreSchema

export const buildURL = ({ name }: RequestData): string => `/api/v1/stores/${name}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>>(buildURL(requestData), requestData)

  return response
}
