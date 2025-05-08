import * as Rq from 'react-query'

import api, { type QueryError, type Response } from '~/app/api'
import { type RequestParams, type Result, URL } from '~/common/entities/processing/procedure/api.v1/update'

export { type RequestParams, type Result, URL }

export const request = (params: RequestParams): Promise<Response<Result>> => api.post(URL, { params })

export type UseMutationResult = Rq.UseMutationResult<Response<Result>, QueryError, RequestParams>

export function useMutation(
  options: Rq.MutationOptions<Response<Result>, QueryError, RequestParams>,
): Rq.UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return Rq.useMutation<Response<Result>, QueryError, RequestParams>(URL, (params) => request(params), options)
}
