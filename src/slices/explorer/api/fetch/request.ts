import { type Response } from '~/app/api'
import api from '~/app/api'

import { type Explorer, type StoreConfig } from '../../models/explorer'

export const NAME = `explorer.fetch`

export type RequestData = {
  paths: string[]
  type: 'postgres' | 's3'
  storeConfig: StoreConfig
}

export type ResponseData = Explorer

export const buildURL = (): string => `/api/v1/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
