import { url } from '../../common'
import type { Response } from '~/shared/api'
import api from '~/shared/axios'

export const NAME = 'files.upload'

export type RequestData = {
  fileId: string
  tableName: string
}

export type ResponseData = { fileName: string }

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>, RequestData>(
    `${url}/explorer/import`,
    requestData,
  )

  return response
}
