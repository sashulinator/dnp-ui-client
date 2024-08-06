import { CreateTargetTable } from '../../../types/target-table'
import { Values } from '../types/values'

export function toValues(instance: Partial<CreateTargetTable>): Values {
  // Можем вернуть Values т.к. значения будут провалидированны в форме
  return instance as Values
}
