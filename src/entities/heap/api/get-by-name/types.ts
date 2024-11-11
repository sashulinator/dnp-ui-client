import type { Heap } from '~/common/entities/heap'

export const keyName = `process.getBykn`

export interface RequestData {
  name: string
}

export type ResponseData = Heap
