import { type UseQueryOptions, type UseQueryResult, useQuery as useReactQuery } from 'react-query'

import { type Response } from '~dnp/shared/api'
import { QueryError } from '~dnp/shared/api'

import { getKeys } from './get-keys'
import { request } from './request'
import { type RequestData, type ResponseData } from './types'

export type Options<TData = ResponseData> = UseQueryOptions<Response<ResponseData>, QueryError, TData, unknown[]>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useCache<TData = ResponseData>(
  requestData: RequestData,
  preferedOptions?: Options<TData>,
): QueryResult<TData> {
  //

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    // Ошибку о том что id не передан отрисовываем на странице
    // но т.к. хуки не могут быть вызваны после if, то делаем проверку на обязательный параметр
    enabled: Boolean(requestData.name),
    ...preferedOptions,
  }

  return useReactQuery(getKeys(requestData), () => request(requestData), options)
}
