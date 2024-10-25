import { useState } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'

import { useDebounceCallback } from '~dnp/utils/core-hooks'

export function useSearch(): [string, string, (value: string) => void] {
  const [queryParam, setQueryParam] = useQueryParam('q', withDefault(StringParam, ''), {
    removeDefaultsFromUrl: true,
  })

  const [value, setValue] = useState(queryParam)

  const [setQueryParamWithDelay] = useDebounceCallback(setQueryParam, 500)

  return [queryParam, value, handleSet]

  function handleSet(value: string) {
    setValue(value)
    setQueryParamWithDelay(value)
  }
}
