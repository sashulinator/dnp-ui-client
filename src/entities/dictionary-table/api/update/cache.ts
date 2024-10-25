import { type MutationOptions, type UseMutationResult, useMutation } from 'react-query'

import { type QueryError, type Response } from '~dnp/shared/api'

import { NAME, type RequestData, type ResponseData, request } from './request'

export function use(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Response<ResponseData>, QueryError, RequestData>([NAME], request, options)
}
