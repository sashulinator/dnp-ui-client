import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import {
  NAME,
  type RequestParams,
  type Result,
  url,
} from '~/common/entities/database-container/dcservice/api.v1/create'
import api, { type QueryError, type Response } from '~/shared/api'

export { type RequestParams, type Result, NAME }

export const request = (params: RequestParams): Promise<Response<Result>> => api.post(url, { params })

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>((params) => request(params), options)
}
