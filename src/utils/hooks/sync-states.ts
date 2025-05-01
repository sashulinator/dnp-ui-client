import { useEffect } from 'react'

import { usePrevious } from '../core-hooks'

export type State<TValue> = [TValue, (v: TValue) => void] | [TValue, (v: TValue) => void, TValue]

export function useSyncStates<TValue>(v1: State<TValue>, v2: State<TValue>) {
  const [state1, setState1, initialPrev1] = v1
  const [state2, setState2, initialPrev2] = v2

  // console.log('state1', state1)
  // console.log('state2', state2)

  const prevValue1 = usePrevious(state1, initialPrev1)
  const prevValue2 = usePrevious(state2, initialPrev2)

  useEffect(() => {
    if (state1 === state2) return
    const isDiff1 = state1 !== prevValue1
    const isDiff2 = state2 !== prevValue2

    if (isDiff1 && isDiff2) setState2(state1)

    if (isDiff1) setState2(state1)
    else if (isDiff2) setState1(state2)
  }, [state1, state2])
}
