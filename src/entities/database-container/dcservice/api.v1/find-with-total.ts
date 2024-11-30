import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import {
  NAME,
  type RequestParams,
  type Result,
  url,
} from '~/common/entities/database-container/dcservice/api.v1/find-with-total'
import api, { type QueryError, type Response } from '~/shared/api'

const request = (params: RequestParams): Promise<Response<Result>> => api.post(url, { params })

export { request, type RequestParams, type Result, NAME }

export type Options<TData = Result> = UseQueryOptions<Response<Result>, QueryError, TData, [string, RequestParams]>
export type QueryResult<TData = Result> = UseQueryResult<TData, QueryError>

export function useCache<TData = Result>(
  requestParams: RequestParams,
  preferredOptions?: Options<TData>,
): QueryResult<TData> {
  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    ...preferredOptions,
  }

  return useReactQuery([NAME, requestParams], () => request(requestParams), options)
}
