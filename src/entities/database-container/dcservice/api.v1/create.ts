import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import api, { type QueryError, type Response } from '~/app/api'
import { NAME, type RequestParams, type Result, url } from '~/common/entities/database-container/dcservice/api/create'

import * as getById from './get-by-id'

export { type RequestParams, type Result, NAME }

export async function request(params: RequestParams): Promise<Response<Result>> {
  const ret = await api.post<Result>(url, { params })
  getById.setCache({ id: ret.data.id }, ret.data)
  return ret
}
export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>((params) => request(params), options)
}
