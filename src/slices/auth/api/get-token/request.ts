import { type GetTokenResult } from '../../models/get-token-result'

export type RequestData = {
  email: string
  password: string
  clientId: string
}

export type ResponseData = GetTokenResult

export async function request(requestData: RequestData): Promise<{
  data: ResponseData
  response: Response
}> {
  const details = [
    ['username', requestData.email],
    ['password', requestData.password],
    ['client_id', requestData.clientId],
    ['grant_type', 'password'],
  ]

  const formBody = details.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')

  const response = await fetch('/realms/IIOT-MVP/protocol/openid-connect/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: formBody,
  })

  const data = await response.json()

  if (!response.ok) throw { data, response }

  return { data, response }
}
