import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

import { Response } from '~dnp/shared/api'
import { QueryError } from '~dnp/shared/api'

import { request } from './request'
import { RequestData, ResponseData } from './types'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>(['storeConfig.remove'], request, options)
}
