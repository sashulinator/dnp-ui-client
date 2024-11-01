import { type QueryError, type Response } from '~/shared/api'
import { type MutationOptions, type UseMutationResult, useMutation } from '~/shared/query'

import { NAME, type RequestData, type ResponseData, request } from './request'

export function use(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation<Response<ResponseData>, QueryError, RequestData>([NAME], request, options)
}
