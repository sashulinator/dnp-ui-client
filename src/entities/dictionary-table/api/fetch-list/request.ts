import api, { type List, type Response } from '~dnp/shared/api'
import { type StringFilter } from '~dnp/shared/where'

import { type DictionaryTable } from '../../models/dictionary-table'
import { v1Url } from '../v1-url'

export type RequestData = {
  skip?: number
  take?: number
  where?: {
    name?: string | StringFilter | undefined
    nav?: boolean | undefined
  }
  select?: Partial<Record<keyof DictionaryTable, boolean>> | undefined
}

export type ResponseData = List<DictionaryTable>

export const buildURL = (): string => v1Url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'SEARCH',
    data: requestData,
  })

  return response
}
