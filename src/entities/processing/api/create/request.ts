import type { Response } from '~/app/api'
import api from '~/app/api'
import { chunk } from '~/utils/array'

import type { RequestData, ResponseData } from './types'

export const buildURL = (): string => `/api/v1/processing/run`

export async function request(requestData: RequestData): Promise<Response<ResponseData>[]> {
  const chunks = chunk(requestData.data.processing.configs, 10)

  const parenPromise = chunks.map((configs) => {
    return api.post<ResponseData, Response<ResponseData>, RequestData>(buildURL(), {
      ...requestData,
      data: {
        ...requestData.data,
        processing: { ...requestData.data.processing, configs },
      },
    })
  })

  return Promise.all(parenPromise)
}
