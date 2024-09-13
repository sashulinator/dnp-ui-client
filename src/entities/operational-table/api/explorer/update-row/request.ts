import { type Response } from '~/lib/api'
import { type Where } from '~/lib/where'
import api from '~/old-shared/axios'

import { SYSNAME } from '../../../constants/name'
import { type OperationalTable, type Row } from '../../../types/operational-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerUpdateRow`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Where }

export type ResponseData = {
  operationalTable: OperationalTable
  row: Row
}

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
