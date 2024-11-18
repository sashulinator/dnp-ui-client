import type { Response } from '~/shared/api'
import { queryClient } from '~/shared/react-query'

import { getKeys } from './get-keys'
import type { ResponseData } from './types'

export function setCache(data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData(getKeys(), response)
}
