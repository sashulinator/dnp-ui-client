import { FlatTable } from '~/entities/database-container/models'
import type { Response } from '~/shared/api'
import api from '~/shared/api'
import { type Where } from '~/slices/where'

export const NAME = 'analytics.findManyAndCountTables'

export type RequestData = {
  limit?: number | undefined
  offset?: number | undefined
  where?: Where | undefined
  sort?: Record<string, 'asc' | 'desc' | undefined> | undefined
}

export type ResponseData = {
  total: number
  items: FlatTable[]
}

export const buildURL = (): string => `api/v1/analytics/find-many-and-count-tables`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await api.post<ResponseData, Response<ResponseData>>(buildURL(), { data: requestData })

  return response
}
