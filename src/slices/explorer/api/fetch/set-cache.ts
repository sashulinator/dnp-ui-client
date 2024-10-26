import { type Response } from '~dnp/shared/api'
import { queryClient } from '~dnp/shared/react-query'

import { NAME } from './request'
import { type RequestData, type ResponseData } from './request'

export function setCache(requestData: RequestData, data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData([NAME, requestData], response)
}
