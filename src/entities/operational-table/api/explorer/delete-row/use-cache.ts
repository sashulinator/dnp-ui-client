import { type MutationOptions, type UseMutationResult, useMutation } from 'react-query'

import { type Response } from '~dnp/shared/api'
import { type QueryError } from '~dnp/shared/api'

import { NAME, type RequestData, type ResponseData, request } from './request'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>([NAME], request, options)
}
