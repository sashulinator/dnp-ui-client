import { type Response } from '~/shared/api'
import api from '~/shared/api'
import { type Where } from '~/slices/where'

import { SLICE } from '../../../constants.name'
import { type DictionaryTable } from '../../../models/dictionary-table'
import { v1Url } from '../../v1-url'

export const NAME = `${SLICE}.explorerDeleteRow`

export type RequestData = { kn: string; where: Where }

export type ResponseData = DictionaryTable

export const buildURL = (): string => `${v1Url}/explorer`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
    method: 'DELETE',
    data: requestData,
  })

  return response
}
