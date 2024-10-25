import axios from 'axios'

import { isAxiosError } from '../api'
import { getRefreshToken } from './get-refresh-token'
import { removeAllTokens } from './remove-all-tokens'
import { setAccessToken } from './set-access-token'
import { setRefreshToken } from './set-refresh-token'

export async function refreshAccessTokenFn(url: string): Promise<void> {
  const refreshToken = getRefreshToken()
  removeAllTokens()

  if (!refreshToken) {
    // history.push(ROUTES.login.path)
    return
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await axios.post<any>(url, { refreshToken })
    setRefreshToken(response.data.refresh_token)
    setAccessToken(response.data.access_token)
  } catch (error) {
    if (!isAxiosError(error)) return

    if (error?.response?.status === 401 || error?.response?.status === 400) {
      // history.push(ROUTES.login.path)
    }

    throw error
  }
}
