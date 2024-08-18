import { CreateOperationalTable } from '../../../types/operational-table'
import { Values } from '../types/values'
import { Partial } from '~/utils/types/object'

export function toValues(instance: Partial<CreateOperationalTable, 'deep'>): Values {
  // Можем скастовать as Values т.к. значения будут провалидированны в форме
  return {
    ...instance,
  } as Values
}
