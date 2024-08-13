import { CreateOperationalTable } from '../../../types/operational-table'
import { Values } from '../types/values'

export function fromValues<N extends CreateOperationalTable>(values: Values): N {
  return {
    ...values,
    tableSchema: JSON.parse(values.tableSchema),
  } as N
}
