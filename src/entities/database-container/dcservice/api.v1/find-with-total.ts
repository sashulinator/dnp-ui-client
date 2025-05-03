import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import {
  NAME,
  type RequestParams,
  type Result,
  URL,
} from '~/common/entities/database-container/dcservice/api/find-with-total'
import api, { type QueryError, type Response } from '~/shared/api'

import * as getById from './get-by-id'

async function request(params: RequestParams): Promise<Response<Result>> {
  const ret = await api.post<Result>(URL, { params })
  ret.data.items.forEach((item) => getById.setCache({ id: item.id }, item))
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
    ...preferredOptions,
  }

  return useReactQuery([URL, requestParams], () => request(requestParams), options)
}
