import { CreateOperationalTable } from '../../../types/operational-table'
import { Values } from '../types/values'

export function fromValues<N extends CreateOperationalTable>(values: Values): N {
  return {
    ...values,
  } as N
}
