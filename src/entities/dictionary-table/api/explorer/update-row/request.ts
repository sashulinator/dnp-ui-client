import { type Response } from '~/shared/api'
import api from '~/shared/axios'
import { type Where } from '~/shared/where'

import { SLICE_NAME } from '../../../constants/name'
import { type DictionaryTable, type Row } from '../../../types/dictionary-table'
import { url } from '../../common'

export const NAME = `${SLICE_NAME}.explorerUpdateRow`

export type RequestData = { kn: string; input: Record<string, unknown>; where: Where }

export type ResponseData = {
  dictionaryTable: DictionaryTable
  row: Row
}

export const buildURL = (): string => `${url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
