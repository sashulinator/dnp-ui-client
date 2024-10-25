export type RequestData = {
  refreshToken: string
}

export type ResponseData = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  'not-before-policy': number
  session_state: string
  scope: string
}

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

  return { data, response }
}
