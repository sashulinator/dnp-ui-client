import { Explorer } from '~/entities/explorer/types/explorer'
import type { Response, StringFilter, Where } from '~/lib/api'
import api from '~/shared/axios'

import { SYSNAME } from '../../../constants/name'
import { OperationalTable } from '../../../types/operational-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerFindManyAndCountRows`

export type RequestData = {
  kn: string
  skip?: number | undefined
  take?: number | undefined
  where?: Where | undefined
  searchQuery?: StringFilter | undefined
  sort?: Record<string, 'asc' | 'desc'> | undefined | null
}

export type ResponseData = {
  explorer: Explorer
  operationalTable: OperationalTable
}

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
