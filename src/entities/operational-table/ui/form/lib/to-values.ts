import { CreateOperationalTable } from '../../../types/operational-table'
import { Values } from '../types/values'

export function toValues(instance: Partial<CreateOperationalTable>): Values {
  // Можем вернуть Values т.к. значения будут провалидированны в форме
  return instance as Values
}
