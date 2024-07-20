import { getKeys } from './get-keys'
import { request } from './request'
import { RequestData, ResponseData } from './types'
import { Response } from '~/lib/api'
import { queryClient } from '~/shared/react-query'

export function cache(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => request(requestData))
}
