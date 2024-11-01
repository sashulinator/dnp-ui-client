import type { Partial } from '~/utils/types/object'

import type { CreateTargetTable } from '../../../types/target-table'
import type { Values } from '../types/values'

export function toValues(instance: Partial<CreateTargetTable, 'deep'>): Values {
  // Можем скастовать as Values т.к. значения будут провалидированны в форме
  return {
    ...instance,
  } as Values
}
