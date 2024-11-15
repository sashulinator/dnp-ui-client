import type { Process } from '~/common/slices/process'

export const keyName = `process.getBykn`

export interface RequestData {
  kn: string
}

export type ResponseData = Process
