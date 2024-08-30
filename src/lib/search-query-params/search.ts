import { useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import { useDebounceCallback } from '~/utils/core-hooks'

export function useSearch(): [string, string, (value: string) => void] {
  const [queryParam, setQueryParam] = useQueryParam('q', withDefault(StringParam, ''))

  const [value, setValue] = useState(queryParam)

  const [setQueryParamWithDelay] = useDebounceCallback((value: string) => setQueryParam(value), 500)

  return [queryParam, value, handleSet]

  function handleSet(value: string) {
    setValue(value)
    setQueryParamWithDelay(value)
  }
}
