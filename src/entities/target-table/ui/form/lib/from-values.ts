import type { CreateTargetTable } from '../../../types/target-table'
import type { Values } from '../types/values'

export function fromValues<N extends CreateTargetTable>(values: Values): N {
  return {
    ...values,
  } as N
}
