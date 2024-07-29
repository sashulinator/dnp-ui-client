import { RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return ['explorer.fetch', requestData]
}
