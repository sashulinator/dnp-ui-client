import { SYSNAME } from '~/entities/operational-table/constants/name'
import { type Response } from '~/shared/api'
import api from '~/shared/api'
import { type Where } from '~/slices/where'

import { type OperationalTable } from '../../../types/operational-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerDeleteRow`

export type RequestData = { kn: string; where: Where }

export type ResponseData = OperationalTable

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'DELETE',
    data: requestData,
  })

  return response
}
