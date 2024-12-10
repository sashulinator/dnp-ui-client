import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import { type QueryError, type Response } from '~/shared/api'

import { type Result, request, url } from './request'

export type Options<TData = Result> = UseQueryOptions<Response<Result>, QueryError, TData, [string]>
export type QueryResult<TData = Result> = UseQueryResult<TData, QueryError>

export function useCache<TData = Result>(preferredOptions?: Options<TData>): QueryResult<TData> {
  const options: Options<TData> = {
    select: (axiosResponse) => {
      return axiosResponse.data as TData
    },
    ...preferredOptions,
  }

  return useReactQuery([url], () => request(), options)
}
