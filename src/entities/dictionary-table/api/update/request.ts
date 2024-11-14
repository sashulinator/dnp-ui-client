import { type Response } from '~/shared/api'
import api from '~/shared/api'

import { SLICE } from '../../constants.name'
import type { DictionaryTable, UpdateDictionaryTable } from '../../models/dictionary-table'
import { v1Url } from '../constants.v1-url'

export const NAME = `${SLICE}.update`

export type RequestData = { input: UpdateDictionaryTable }

export type ResponseData = DictionaryTable

export const buildURL = (): string => v1Url

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.put<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
