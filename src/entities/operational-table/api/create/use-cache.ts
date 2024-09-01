import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

import { Response } from '~/lib/api'
import { QueryError } from '~/lib/api'

import { NAME, type RequestData, type ResponseData, request } from './request'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>([NAME], request, options)
}
