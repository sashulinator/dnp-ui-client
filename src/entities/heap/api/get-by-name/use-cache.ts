import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import { type Response } from '~/shared/api'
import type { QueryError } from '~/shared/api'

import { getKeys } from './get-keys'
import { request } from './request'
import { type RequestData, type ResponseData } from './types'

export type Options<TData = ResponseData> = UseQueryOptions<Response<ResponseData>, QueryError, TData, unknown[]>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useCache<TData = ResponseData>(
  requestData: RequestData,
  preferredOptions?: Options<TData>,
): QueryResult<TData> {
  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    enabled: Boolean(requestData.name),
    ...preferredOptions,
  }

  return useReactQuery(getKeys(requestData), () => request(requestData), options)
}
