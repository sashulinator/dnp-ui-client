import { type RequestData } from './types'

export function getKeys(requestData: RequestData): unknown[] {
  return ['heap.getByName', requestData.name]
}
