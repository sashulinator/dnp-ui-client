import { type Explorer } from '~/entities/explorer'
import type { Response } from '~/shared/api'
import api from '~/shared/axios'
import type { Sort } from '~/shared/sort'
import type { StringFilter, Where } from '~/shared/where'

import { SYSNAME } from '../../../constants/name'
import { type DictionaryTable } from '../../../types/dictionary-table'
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
  dictionaryTable: DictionaryTable
}

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
