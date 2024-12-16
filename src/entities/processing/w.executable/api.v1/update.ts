import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import { type RequestParams, type Result, URL } from '~/common/entities/processing/w.procedure/api.v1/update'
import api, { type QueryError, type Response } from '~/shared/api'

export { type RequestParams, type Result, URL }

export const request = (params: RequestParams): Promise<Response<Result>> => api.post(URL, { params })

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>(URL, (params) => request(params), options)
}
