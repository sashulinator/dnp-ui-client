import { getKeys } from './get-keys'
import { type RequestData, type ResponseData } from './types'
import { type Response } from '~/lib/api'
import { queryClient } from '~/shared/react-query'

export function setCache(requestData: RequestData, data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData(getKeys(requestData), response)
}
