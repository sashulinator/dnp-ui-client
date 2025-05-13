import { type Dictionary, generateId } from '~/utils/core'

import api from '../api'

type RpcParams = {
  url: string
  params?: Dictionary | undefined
}

export function rpc(rpcParams: RpcParams) {
  return api.post(rpcParams.url, {
    requestId: generateId(),
    params: rpcParams.params,
  })
}
