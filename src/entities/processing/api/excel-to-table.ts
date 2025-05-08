import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import api, { type QueryError, type Response } from '~/app/api'
import { NAME, type RequestParams, type Result, URL } from '~/common/entities/processing/api.v1/excel-to-table'

export { type RequestParams, type Result, NAME }

export const request = (params: RequestParams): Promise<Response<Result>> => api.post(URL, { params })

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>((params) => request(params), options)
}
