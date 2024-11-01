import { useState } from 'react'
import { useQueryParam } from 'use-query-params'

import { JSONParam } from '~/shared/use-query-params'
import { isString } from '~/utils/core'
import { useDebounceCallback } from '~/utils/core-hooks'

import { type Sort } from '..'

export function useSort(
  listeners?: ((prevState: Sort | undefined, nextState: Sort | undefined) => void)[],
): [Sort | undefined, Sort | undefined, (value: Sort | undefined) => void] {
  const [rawQueryParam, setQueryParam] = useQueryParam('sort', JSONParam)

  const queryParam = formatQueryParamToSort(rawQueryParam)

  const [value, setValue] = useState(queryParam)

  const [setQueryParamWithDelay] = useDebounceCallback(setQueryParam, 500)

  return [queryParam, value, handleSet]

  function handleSet(newValue: Sort | undefined) {
    if (newValue === value) return
    setValue((value) => {
      listeners?.forEach((listener) => listener(value, newValue))
      return newValue
    })
    setQueryParamWithDelay(newValue)
  }

  /**
   * Private
   */

  // Мы не контролируем стейт в урле и пользователь может задать неверное значение
  function formatQueryParamToSort(input: Record<string, unknown> | undefined | null): Sort | undefined {
    const values = Object.values(input || {})

    if (input === undefined || input === null) {
      return undefined
    }

    if (values.length !== 1) {
      return undefined
    }

    if (!isString(values[0])) {
      return undefined
    }

    if (!['asc', 'desc'].includes(values[0])) {
      return undefined
    }

    return input as Sort
  }
}
