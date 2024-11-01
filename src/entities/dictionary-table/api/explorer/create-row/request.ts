import { type Response } from '~/shared/api'
import api from '~/shared/api'

import { SLICE_NAME } from '../../../constants/name'
import { type DictionaryTable } from '../../../models/dictionary-table'
import { v1Url } from '../../v1-url'

export const NAME = `${SLICE_NAME}.explorerCreateRow`

export type RequestData = { kn: string; input: unknown }

export type ResponseData = DictionaryTable

export const buildURL = (): string => `${v1Url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), requestData)

  return response
}
