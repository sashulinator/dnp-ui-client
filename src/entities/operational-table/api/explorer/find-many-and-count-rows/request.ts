import { type Explorer } from '~/entities/explorer/types/explorer'
import type { Response } from '~/lib/api'
import type { Sort } from '~/lib/sort'
import type { StringFilter, Where } from '~/lib/where'
import api from '~/old-shared/axios'

import { SYSNAME } from '../../../constants/name'
import { type OperationalTable } from '../../../types/operational-table'
import { url } from '../../common'

export const NAME = `${SYSNAME}.explorerFindManyAndCountRows`

export type RequestData = {
  kn: string
  skip?: number | undefined
  take?: number | undefined
  where?: Where | undefined
  searchQuery?: StringFilter | undefined
  sort?: Sort | undefined
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
