import type { Response } from '~dnp/shared/api'
import api from '~dnp/shared/api'

import { url } from '../../common'

export const NAME = 'files.upload'

export type RequestData = {
  fileId: string
  tableName: string
  operationalTableId: string
}

export type ResponseData = { fileName: string }

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(
    `${url}/explorer/import`,
    requestData,
  )

  return response
}
