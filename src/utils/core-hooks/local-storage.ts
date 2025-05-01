/* eslint-disable no-console */
import { useState } from 'react'

import type { SetterOrUpdater } from '../core/types/setter-or-updater'

type Params = { key: string | undefined; initialValue?: string | undefined }

/** Hook that help to use localStorage browser API */
export const useLocalStorage = ({
  key,
  initialValue,
}: Params): [string | undefined, SetterOrUpdater<string | undefined>, (key: string) => void, () => void] => {
  /** Handler for read value from localStorage */
  const readValue = (): string | undefined => {
    if (key === undefined) return
    try {
      const item = window.localStorage.getItem(key)

      return item ? item : initialValue
    } catch (error) {
      console.error(error)

      return initialValue
    }
  }

  const [storedValue, setStoredValue] = useState<string | undefined>(readValue)

  /** Handler for set value to localStorage */
  const setValue = (value: string | unknown | undefined) => {
    if (key === undefined) return

    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value

      setStoredValue(valueToStore)

      if (valueToStore === undefined) {
        window.localStorage.removeItem(key)
      } else {
        window.localStorage.setItem(key, valueToStore)
      }
    } catch (error) {
      console.error(error)
    }
  }

  /** Handler for remove value from localStorage */
  const removeValue = (key: string) => {
    if (key === undefined) return

    try {
      window.localStorage.removeItem(key)

      setStoredValue(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  /** Handler for clear all values from localStorage */
  const clearAllValues = () => {
    if (key === undefined) return

    try {
      window.localStorage.clear()

      setStoredValue(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue, removeValue, clearAllValues]
}
