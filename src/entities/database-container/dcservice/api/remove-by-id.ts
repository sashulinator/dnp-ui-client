import {
  NAME,
  type RequestParams,
  type Result,
  url,
} from '~/common/entities/database-container/dcservice/api/remove-by-id'
import {
  type MutationOptions,
  type QueryError,
  type Response,
  type UseMutationResult,
  rpc,
  useMutation as useQueryMutation,
} from '~rpc'

import * as getById from './get-by-id'

export { type RequestParams, type Result, NAME }

export async function request(params: RequestParams): Promise<Response<Result>> {
  const ret = await rpc<Result>({ url, params })
  getById.clearCache({ id: ret.data.id })
  return ret
}

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>((params) => request(params), options)
}
