import { AxiosError } from 'axios'

export function isUnauthorized(error: AxiosError): boolean {
  return error?.response?.status === 401
}
