import { type Response } from '~/shared/api'
import { queryClient } from '~/shared/react-query'

import { NAME, type RequestData, type ResponseData, request } from './request'

export function cache(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery([NAME, requestData], () => request(requestData))
}
