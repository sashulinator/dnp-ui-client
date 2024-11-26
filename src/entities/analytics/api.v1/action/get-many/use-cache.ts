import { useQuery as useReactQuery } from 'react-query'

import { getKeys } from './get-keys'
import { request } from './request'

export function useCache() {
  return useReactQuery(getKeys(), () => request())
}
