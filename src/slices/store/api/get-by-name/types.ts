import type { Store } from '~/common/slices/store'

export const keyName = `process.getBykn`

export interface RequestData {
  name: string
}

export type ResponseData = Store
