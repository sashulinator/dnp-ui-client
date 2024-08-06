import { CreateTargetTable } from '../../../types/target-table'
import { Values } from '../types/values'

export function fromValues<N extends CreateTargetTable>(values: Values): N {
  return values as N
}
