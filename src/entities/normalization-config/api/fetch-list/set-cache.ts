import { Response } from '~/shared/api'
import { queryClient } from '~/shared/react-query'

import { getKeys } from './get-keys'
import { RequestData, ResponseData } from './types'

export function setCache(requestData: RequestData, data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData(getKeys(requestData), response)
}
