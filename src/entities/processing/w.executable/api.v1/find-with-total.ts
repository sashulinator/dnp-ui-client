import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import { type RequestParams, type Result, URL } from '~/common/entities/processing/w.executable/api.v1/find-with-total'
import api, { type QueryError, type Response } from '~/shared/api'

const request = (params: RequestParams): Promise<Response<Result>> => api.post(URL, { params })

export { request, type RequestParams, type Result, URL }

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

  return useReactQuery([URL, requestParams], () => request(requestParams), options)
}
