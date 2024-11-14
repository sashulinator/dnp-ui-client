import { type Response } from '~/shared/api'
import api from '~/shared/api'

import { SLICE } from '../../../constants.name'
import { type DictionaryTable } from '../../../models/dictionary-table'
import { v1Url } from '../../constants.v1-url'

export const NAME = `${SLICE}.explorerCreateRow`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = DictionaryTable

export const buildURL = (): string => `${v1Url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
