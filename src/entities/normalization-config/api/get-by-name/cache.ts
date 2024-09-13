import { type Response } from '~/lib/api'
import { queryClient } from '~/old-shared/react-query'

import { getKeys } from './get-keys'
import { request } from './request'
import { type RequestData, type ResponseData } from './types'

export function cache(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => request(requestData))
}
