import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import type { QueryError, Response } from '~/shared/api'

import { type RequestParams, type Result, request } from './request'

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, RequestParams>,
): UseMutationResult<Response<Result>, QueryError, RequestParams> {
  return useQueryMutation<Response<Result>, QueryError, RequestParams>((params) => request(params), options)
}
