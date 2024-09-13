import { type Response } from '~/lib/api'
import { queryClient } from '~/old-shared/react-query'

import { getKeys } from './get-keys'
import { type RequestData, type ResponseData } from './types'

export function setCache(requestData: RequestData, data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData(getKeys(requestData), response)
}
