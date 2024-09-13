import { AxiosError } from 'axios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAxiosError(input: any): input is AxiosError {
  return !!input?.config && !!input.response
}
