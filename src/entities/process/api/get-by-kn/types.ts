import type { Process } from '~dnp/common/entities/process'

export const keyName = `process.getBykn`

export interface RequestData {
  kn: string
}

export type ResponseData = Process
