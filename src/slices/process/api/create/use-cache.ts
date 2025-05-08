import type { MutationOptions, UseMutationResult } from 'react-query'
import { useMutation } from 'react-query'

import type { QueryError, Response } from '~/app/api'

import { request } from './request'
import type { RequestData, ResponseData } from './types'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>(['normalizationConfig.run'], request, options)
}
