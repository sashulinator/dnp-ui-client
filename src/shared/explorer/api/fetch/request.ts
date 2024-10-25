import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/axios'

import { SYSNAME } from '../../constants/name'
import { type Explorer, type StoreConfig } from '../../models/explorer'

export const NAME = `${SYSNAME}.fetch`

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
