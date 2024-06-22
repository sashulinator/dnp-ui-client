import { getKeys } from './get-keys'
import { request } from './request'
import { type RequestData, type ResponseData } from './types'
import { type Response } from '~/lib/api'
import { queryClient } from '~/shared/react-query'

export function cache(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => request(requestData))
}
