import { MutationOptions, UseMutationResult, useMutation } from 'react-query'
import { request } from './request'
import { RequestData, ResponseData } from './types'
import { Response } from '~/lib/api'
import { QueryError } from '~/lib/api'

export function useCache(
  options: MutationOptions<Response<ResponseData>, QueryError, RequestData>,
): UseMutationResult<Response<ResponseData>, QueryError, RequestData> {
  return useMutation<Response<ResponseData>, QueryError, RequestData>(['storeConfig.create'], request, options)
}
