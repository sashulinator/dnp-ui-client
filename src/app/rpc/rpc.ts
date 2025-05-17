import type { AxiosResponse } from 'axios'

import { type Dictionary, generateId } from '~/utils/core'

import api from '../api'

type RpcParams = {
  url: string
  params?: Dictionary | undefined
}

export function rpc<TResult>(rpcParams: RpcParams): Promise<AxiosResponse<TResult>> {
  return api.post<TResult>(rpcParams.url, {
    requestId: generateId(),
    params: rpcParams.params,
  })
}
