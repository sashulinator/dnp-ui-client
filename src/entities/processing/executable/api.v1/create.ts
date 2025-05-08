import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import api, { type QueryError, type Response } from '~/app/api'
import { type RequestParams, type Result, URL } from '~/common/entities/processing/procedure/api.v1/create'

export { type RequestParams, type Result, URL }

export const request = (params: RequestParams): Promise<Response<Result>> => api.post(URL, { params })

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>(URL, (params) => request(params), options)
}
