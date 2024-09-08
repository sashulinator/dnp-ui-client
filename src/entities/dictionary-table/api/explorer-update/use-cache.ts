import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

import { Response } from '~/lib/api'
import { QueryError } from '~/lib/api'

import { request } from './request'
import { RequestData, ResponseData, keyName } from './types'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>([keyName], request, options)
}
