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
  const response = await fetch('/api/v1/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      refreshToken: requestData.refreshToken,
    }),
  })

  const data = await response.json()

  if (!response.ok) throw { data, response }

  return { data, response }
}
