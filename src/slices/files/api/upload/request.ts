import type { Response } from '~/shared/api'
import api from '~/shared/api'

import { v1url } from '../constants.v1-url'

export const NAME = 'files.upload'

export type RequestData = { file: File; bucketName: string; fileName: string }

export type ResponseData = { fileName: string; bucketName: string }

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const headers = { 'Content-Type': 'multipart/form-data' }

  const formData = new FormData()
  formData.append('file', requestData.file)
  formData.append('fileName', requestData.fileName)
  formData.append('bucketName', requestData.bucketName)

  const response = await api.post<ResponseData, Response<ResponseData>>(`${v1url}/upload`, formData, { headers })

  return response
}
