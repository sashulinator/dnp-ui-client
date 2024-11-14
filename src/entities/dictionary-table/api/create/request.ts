import api, { type Response } from '~/shared/api'

import { SLICE } from '../../constants.name'
import { type CreateDictionaryTable, type DictionaryTable } from '../../models/dictionary-table'
import { v1Url } from '../constants.v1-url'

export const NAME = `${SLICE}.create`

export type RequestData = { input: CreateDictionaryTable }

export type ResponseData = DictionaryTable
export const buildURL = (): string => v1Url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
