import axios from 'axios'
import { type MutationOptions, type UseMutationResult, useMutation as useQueryMutation } from 'react-query'

import type { QueryError, Response } from '~/app/api'

export type Params = {
  email: string
  password: string
}

export type Result = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
}

export async function request(params: Params): Promise<Response<Result>> {
  const ret = await axios.request<Result>({
    method: 'POST',
    url: '/api/v1/auth/login',
    headers: { 'Content-Type': 'application/json' },
    data: {
      username: params.email,
      password: params.password,
    },
  })

  return ret
}

export function useMutation(
  options: MutationOptions<Response<Result>, QueryError, Params>,
): UseMutationResult<Response<Result>, QueryError, Params> {
  return useQueryMutation<Response<Result>, QueryError, Params>((params) => request(params), options)
}
