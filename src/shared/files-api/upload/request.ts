import type { Response } from '~dnp/shared/api'
import api from '~dnp/shared/axios'

import { url } from '../constants'

export const NAME = 'files.upload'

export type RequestData = { file: File }

export type ResponseData = { fileId: string }

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const headers = { 'Content-Type': 'multipart/form-data' }

  const formData = new FormData()
  formData.append('file', requestData.file)

  const response = await api.post<ResponseData, Response<ResponseData>>(`${url}/upload`, formData, { headers })

  return response
}
