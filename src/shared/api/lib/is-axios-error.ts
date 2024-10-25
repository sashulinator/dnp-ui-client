import { type AxiosError } from 'axios'

import { has } from '~/utils/core'

export function isAxiosError(input: unknown): input is AxiosError {
  return has(input, 'config') && has(input, 'response')
}
