import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import { type Response } from '~/shared/api'
import { type QueryError } from '~/shared/api'

import { NAME, type RequestData, type ResponseData, request } from './request'

export function useMutation(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useQueryMutation<Response<ResponseData>, QueryError, RequestData>([NAME], request, options)
}
