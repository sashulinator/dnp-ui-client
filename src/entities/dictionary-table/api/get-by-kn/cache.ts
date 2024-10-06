import { type UseQueryOptions, type UseQueryResult, useQuery } from 'react-query'

import { type Response } from '~/shared/api'
import { type QueryError } from '~/shared/api'
import { queryClient } from '~/shared/react-query'

import { NAME, type RequestData, type ResponseData, request } from './request'

/**
 * getKeys
 */

export function getKeys(requestData: RequestData): unknown[] {
  return [NAME, requestData]
}

/**
 * get
 */

export function get(requestData: RequestData): Promise<Response<ResponseData>> {
  return queryClient.fetchQuery(getKeys(requestData), () => request(requestData))
}

/**
 * set
 */

export function set(requestData: RequestData, data: ResponseData): void {
  const response: Response<ResponseData> = { data }
  queryClient.setQueryData(getKeys(requestData), response)
}

/**
 * use
 */

export type Options<TData = ResponseData> = UseQueryOptions<Response<ResponseData>, QueryError, TData, unknown[]>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function use<TData = ResponseData>(
  requestData: RequestData,
  preferedOptions?: Options<TData>,
): QueryResult<TData> {
  //

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    enabled: Boolean(requestData.kn),
    ...preferedOptions,
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery(getKeys(requestData), () => request(requestData), options)
}
