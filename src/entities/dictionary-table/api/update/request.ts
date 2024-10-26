import { type Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'

import { SLICE_NAME } from '../../constants/name'
import type { DictionaryTable, UpdateDictionaryTable } from '../../models/dictionary-table'
import { v1Url } from '../v1-url'

export const NAME = `${SLICE_NAME}.update`

export type RequestData = { input: UpdateDictionaryTable }

export type ResponseData = DictionaryTable

export const buildURL = (): string => v1Url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
