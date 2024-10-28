import { type GetTokenResult } from '../../models/get-token-result'

export type RequestData = {
  refreshToken: string
}

export type ResponseData = GetTokenResult

export async function request(requestData: RequestData): Promise<{
  data: ResponseData
  response: Response
}> {
  const details = {
    refresh_token: requestData.refreshToken,
    grant_type: 'refresh_token',
    client_id: 'iiot-control-mvp',
  }

  const formBody = Object.entries(details)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  const response = await fetch(`/realms/IIOT-MVP/protocol/openid-connect/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formBody,
  })

  const data = await response.json()

  if (!response.ok) throw { data, response }

  return { data, response }
}
