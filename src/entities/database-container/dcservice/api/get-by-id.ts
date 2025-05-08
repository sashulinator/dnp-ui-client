import { type RequestParams, type Result, URL } from '~/common/entities/database-container/dcservice/api/get-by-id'
import {
  type QueryError,
  type Response,
  type UseQueryOptions,
  type UseQueryResult,
  queryClient,
  rpc,
  useQuery,
} from '~rpc'

async function request(params: RequestParams): Promise<Response<Result>> {
  const cache = getCache(params)
  if (cache) return cache
  const ret = await rpc({ url: URL, params })
  setCache(params, ret.data)
  return ret
}

export { request, type RequestParams, type Result, URL }

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

  return useQuery([URL, requestParams], () => request(requestParams), options)
}

export function setCache(requestParams: RequestParams, data: Result): void {
  const response: Response<Result> = { data }
  queryClient.setQueryData([URL, requestParams], response)
}

export function clearCache(requestParams: RequestParams): void {
  queryClient.invalidateQueries([URL, requestParams])
}

export function getCache(requestParams: RequestParams): { data: Result } | undefined {
  return queryClient.getQueryData<{ data: Result }>([URL, requestParams])
}
