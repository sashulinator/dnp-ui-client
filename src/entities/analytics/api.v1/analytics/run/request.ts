import { type Response } from '~/shared/api'
import api from '~/shared/api'

export const NAME = `analytics.explorerCreateRow`

export type RequestData = {
  services: {
    host: string
    port: number
    username: string
    password: string
    databases: {
      name: string
      schemas: {
        name: string
        tables: {
          name: string
          columns: {
            name: string
            actions: string[]
          }[]
        }[]
      }[]
    }[]
  }[]
}

export type ResponseData = unknown

export const buildURL = (): string => `/api/v1/analytics/run`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>>(buildURL(), { data: requestData })

  return response
}
