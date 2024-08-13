import { CreateOperationalTable } from '../../../types/operational-table'
import { Values } from '../types/values'

export function toValues(instance: Partial<CreateOperationalTable>): Values {
  // Можем вернуть as Values т.к. значения будут провалидированны в форме
  return {
    ...instance,
    tableSchema: JSON.stringify(instance.tableSchema),
  } as Values
}
