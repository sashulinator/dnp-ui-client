import type { SetterOrUpdater, ValueOrSetter } from '../core'
import type { Param } from './types'

export function useStringStorage<TValue>(
  stateWithSetter: [string | undefined, SetterOrUpdater<string | undefined>, ...unknown[]],
  param: Param<TValue>,
): [TValue | undefined, SetterOrUpdater<TValue | undefined>] {
  const [state, setState] = stateWithSetter

  return [param.toValue(state), setValue]

  function setValue(value: ValueOrSetter<TValue | undefined>) {
    if (typeof value === 'function') {
      setState((string) => param.toString((value as any)(param.toValue(string))))
    } else {
      setState(param.toString(value))
    }
  }
}
