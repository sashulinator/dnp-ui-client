import type { Response } from '~/shared/api'
import api from '~/shared/api'

import { url } from '../constants'

export const NAME = 'files.upload'

export type RequestData = { file: File; bucketName: string }

export type ResponseData = { fileName: string; bucketName: string }

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const headers = { 'Content-Type': 'multipart/form-data' }

  const formData = new FormData()
  formData.append('file', requestData.file)
  formData.append('bucketName', requestData.bucketName)

  const response = await api.post<ResponseData, Response<ResponseData>>(`${url}/upload`, formData, { headers })

  return response
}
