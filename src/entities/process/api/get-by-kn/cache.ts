import type { Response } from '~/shared/api'
import { queryClient } from '~/shared/react-query'

import { getKeys } from './get-keys'
import { request } from './request'
import type { RequestData, ResponseData } from './types'

export function cache(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => request(requestData))
}
