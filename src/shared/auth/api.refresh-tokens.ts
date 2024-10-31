export type RequestData = {
  refreshToken: string
}

export type ResponseData = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
}

export async function request(requestData: RequestData): Promise<{
  data: ResponseData
  response: Response
}> {
  const details = [
    ['refresh_token', requestData.refreshToken],
    ['client_id', 'dnp'],
    ['grant_type', 'password'],
  ]

  const formBody = details.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')

  const response = await fetch(`/realms/DEVELOPMENT/protocol/openid-connect/token`, {
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
