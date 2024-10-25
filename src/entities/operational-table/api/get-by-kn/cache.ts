import { Response } from '~dnp/shared/api'
import { queryClient } from '~dnp/shared/react-query'

import { getKeys } from './get-keys'
import { request } from './request'
import { RequestData, ResponseData } from './types'

export function cache(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => request(requestData))
}
