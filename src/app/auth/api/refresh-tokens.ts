import axios from 'axios'

import type { Response } from '~/shared/api'

export type RequestData = {
  refreshToken: string
}

export type ResponseData = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
}

export async function request(requestData: RequestData): Promise<Response<ResponseData>> {
  const response = await axios.request({
    url: '/api/v1/auth/refresh',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: {
      refreshToken: requestData.refreshToken,
    },
  })

  return response
}
