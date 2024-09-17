import { type Response } from '~/shared/api'
import api from '~/shared/axios'

import { SYSNAME } from '../../../constants/name'
import { type TargetTable } from '../../../types/target-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerCreateRow`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = TargetTable

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
