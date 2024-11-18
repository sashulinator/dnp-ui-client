import type { Response } from '~/shared/api'
import { queryClient } from '~/shared/react-query'

import { getKeys } from './get-keys'
import { request } from './request'
import type { ResponseData } from './types'

export function cache(): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(), () => request())
}
