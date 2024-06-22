import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import { isDev } from '../core/is/dev'

export function useControlledState<T>(
  defaulValue: T,
  incomingValue: T | undefined,
  setIncomingValue?: ((v: T) => void) | undefined
): [T, Dispatch<SetStateAction<T>>] {
  const defaultRef = useRef(defaulValue)
  const incomingValueRef = useRef(incomingValue)
  const isUncontrolled = incomingValue === undefined

  const [value, setValue] = useState(incomingValue ?? defaulValue)

  useEffect(() => {
    if (value !== incomingValue) {
      if (incomingValue !== undefined && incomingValueRef.current === undefined) {
        setIncomingValue?.(incomingValue)
        if (isDev()) {
          console.error('Dont change state from uncontrolled to controlled')
        }
      }
      if (incomingValue === undefined && incomingValueRef.current !== undefined) {
        setValue(defaultRef.current)
        if (incomingValueRef.current !== undefined && isDev()) {
          console.error('Dont change state from controlled to uncontrolled')
        }
      }
    }
  }, [incomingValue])

  return isUncontrolled ? [value, setValue] : ([incomingValue, setIncomingValue] as [T, Dispatch<SetStateAction<T>>])
}
