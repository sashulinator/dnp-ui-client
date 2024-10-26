import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'
import { type Where } from '~dnp/slices/where'

import { SLICE_NAME } from '../../../constants/name'
import { type DictionaryTable, type Row } from '../../../models/dictionary-table'
import { v1Url } from '../../v1-url'

export const NAME = `${SLICE_NAME}.explorerUpdateRow`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Where }

export type ResponseData = {
  dictionaryTable: DictionaryTable
  row: Row
}

export const buildURL = (): string => `${v1Url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
