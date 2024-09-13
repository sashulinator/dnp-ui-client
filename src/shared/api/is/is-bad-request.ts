import { AxiosError } from 'axios'

export function isBadRequest(error: AxiosError): boolean {
  return error?.response?.status === 400
}
