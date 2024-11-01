import type { Response } from '~/shared/api'
import api from '~/shared/api'
import { type Explorer } from '~/slices/explorer'
import type { Sort } from '~/slices/sort'
import type { StringFilter, Where } from '~/slices/where'

import { SLICE_NAME } from '../../../constants/name'
import { type DictionaryTable } from '../../../models/dictionary-table'
import { v1Url } from '../../v1-url'

export const NAME = `${SLICE_NAME}.explorerFindManyAndCountRows`

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

export const buildURL = (): string => `${v1Url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
