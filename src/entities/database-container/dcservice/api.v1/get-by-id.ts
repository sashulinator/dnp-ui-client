import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import {
  NAME,
  type RequestParams,
  type Result,
  URL,
} from '~/common/entities/database-container/dcservice/api/get-by-id'
import api, { type QueryError, type Response } from '~/shared/api'
import { queryClient } from '~/shared/query'

async function request(params: RequestParams): Promise<Response<Result>> {
  const cache = getCache(params)
  if (cache) return cache
  const ret = await api.post(URL, { params })
  setCache(params, ret.data)
  return ret
}

export { request, type RequestParams, type Result, NAME }

export type Options<TData = Result> = UseQueryOptions<Response<Result>, QueryError, TData, [string, RequestParams]>
export type QueryResult<TData = Result> = UseQueryResult<TData, QueryError>

export function useCache<TData = Result>(
  requestParams: RequestParams,
  preferredOptions?: Options<TData>,
): QueryResult<TData> {
  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    enabled: Boolean(requestParams.id),
    ...preferredOptions,
  }

  return useReactQuery([NAME, requestParams], () => request(requestParams), options)
}

export function setCache(requestParams: RequestParams, data: Result): void {
  const response: Response<Result> = { data }
  queryClient.setQueryData([NAME, requestParams], response)
}

export function clearCache(requestParams: RequestParams): void {
  queryClient.invalidateQueries([NAME, requestParams])
}

export function getCache(requestParams: RequestParams): { data: Result } | undefined {
  return queryClient.getQueryData<{ data: Result }>([NAME, requestParams])
}
