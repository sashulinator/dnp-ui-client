import { type Response, api } from '~dnp/shared/api'

import { SLICE_NAME } from '../../constants/name'
import { type CreateDictionaryTable, type DictionaryTable } from '../../models/dictionary-table'
import { v1Url } from '../v1-url'

export const NAME = `${SLICE_NAME}.create`

export type RequestData = { input: CreateDictionaryTable }

export type ResponseData = DictionaryTable
export const buildURL = (): string => v1Url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
