import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import { type Response } from '~/shared/api'
import { type QueryError } from '~/shared/api'

import { NAME, request } from './request'
import { type RequestData, type ResponseData } from './request'

export type Options<TData = ResponseData> = UseQueryOptions<Response<ResponseData>, QueryError, TData, unknown[]>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useCache<TData = ResponseData>(
  requestData: RequestData,
  preferedOptions?: Options<TData>,
): QueryResult<TData> {
  //

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    ...preferedOptions,
  }

  return useReactQuery([NAME, requestData] as const, () => request(requestData), options)
}
