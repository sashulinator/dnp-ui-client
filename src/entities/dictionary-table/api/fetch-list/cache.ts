import { type QueryError, type Response } from '~/shared/api'
import { queryClient } from '~/shared/query'
import { type UseQueryOptions, type UseQueryResult, useQuery } from '~/shared/query'

import { SLICE } from '../../constants.name'
import { type RequestData, type ResponseData, request as apiRequest } from './request'

/**
 * getKeys
 */

export function getKeys(requestData: RequestData): unknown[] {
  return [`${SLICE}.fetchList`, requestData]
}

/**
 * cache
 */

export function request(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => apiRequest(requestData))
}

/**
 * useCache
 */

export type Options<TData = ResponseData> = UseQueryOptions<Response<ResponseData>, QueryError, TData, unknown[]>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function use<TData = ResponseData>(
  requestData: RequestData,
  preferedOptions?: Options<TData>,
): QueryResult<TData> {
  //

  const options: Options<TData> = {
    select: (response) => response.data as TData,
    ...preferedOptions,
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(getKeys(requestData), () => apiRequest(requestData), options)
}
