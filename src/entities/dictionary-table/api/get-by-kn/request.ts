import api, { type Response } from '~/shared/api'

import { SLICE } from '../../constants.name'
import { type DictionaryTable } from '../../models/dictionary-table'
import { v1Url } from '../constants.v1-url'

export const NAME = `${SLICE}.getBykn`

export interface RequestData {
  kn: string
  select?: Partial<Record<keyof DictionaryTable, boolean>> | undefined
}

export type ResponseData = DictionaryTable

export const buildURL = (requestData: RequestData): string => `${v1Url}/${requestData.kn}`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { kn, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ kn }), { data: body })

  return response
}
