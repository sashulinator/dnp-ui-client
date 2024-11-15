import type { MutationOptions, UseMutationResult } from 'react-query'
import { useMutation } from 'react-query'

import type { Response } from '~/shared/api'
import type { QueryError } from '~/shared/api'

import { request } from './request'
import type { RequestData, ResponseData } from './request'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>((requestData) => request(requestData), options)
}
