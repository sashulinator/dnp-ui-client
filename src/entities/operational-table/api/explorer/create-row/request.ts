import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/axios'

import { SYSNAME } from '../../../constants/name'
import { type OperationalTable } from '../../../types/operational-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerCreateRow`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = OperationalTable

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
