import type { Response } from '~/shared/api'
import api from '~/shared/api'
import { type Process } from '~/slices/process'
import { type Id } from '~/utils/core'

import { type NormalizationConfig } from '../../types/normalization-config'

export const NAME = 'normalizationConfig.run'

export interface RequestData {
  id: Id
  select?: Partial<Record<keyof NormalizationConfig, boolean>> | undefined
}

export type ResponseData = { process: Process }

export const buildURL = (requestData: RequestData): string => `/api/v1/normalization-configs/${requestData.id}/run`

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const { id, ...body } = requestData
  const response = await api.get<ResponseData, Response<ResponseData>>(buildURL({ id }), { data: body })

  return response
}
