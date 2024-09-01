import { useState } from 'react'
import { useQueryParam } from 'use-query-params'

import { isString } from '~/utils/core'
import { useDebounceCallback } from '~/utils/core-hooks'

import { JSONParam } from './json-param'

export type Sort = Record<string, 'asc' | 'desc'> | null

export function useSort(): [Sort, Sort, (value: Sort) => void] {
  const [rawQueryParam, setQueryParam] = useQueryParam('sort', JSONParam)

  const queryParam = formatQueryParamToSort(rawQueryParam)

  const [value, setValue] = useState(queryParam)

  const [setQueryParamWithDelay] = useDebounceCallback(setQueryParam, 500)

  return [queryParam, value, handleSet]

  function handleSet(value: Sort) {
    setValue(value)
    setQueryParamWithDelay(value)
  }

  /**
   * Private
   */

  // Мы не контролируем стейт в урле и пользователь может задать неверное значение
  function formatQueryParamToSort(input: Record<string, unknown> | undefined | null): Sort {
    const values = Object.values(input || {})

    if (input === undefined) {
      return null
    }

    if (values.length !== 1) {
      return null
    }

    if (!isString(values[0])) {
      return null
    }

    if (!['asc', 'desc'].includes(values[0])) {
      return null
    }

    return input as Sort
  }
}
