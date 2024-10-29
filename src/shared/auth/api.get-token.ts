export type RequestData = {
  email: string
  password: string
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
    ['username', requestData.email],
    ['password', requestData.password],
    ['client_id', 'dnp'],
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
