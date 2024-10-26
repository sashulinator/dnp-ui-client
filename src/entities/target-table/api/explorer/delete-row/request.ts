import { SYSNAME } from '~dnp/entities/target-table/constants/name'
import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'
import { type Where } from '~dnp/slices/where'

import { type TargetTable } from '../../../types/target-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerDeleteRow`

export type RequestData = { kn: string; where: Where }

export type ResponseData = TargetTable

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'DELETE',
    data: requestData,
  })

  return response
}
