import type { Partial } from '~/utils/types/object'

import type { CreateDictionaryTable } from '../../../models/dictionary-table'
import type { Values } from '../types/values'

export function toValues(instance: Partial<CreateDictionaryTable, 'deep'>): Values {
  // Можем скастовать as Values т.к. значения будут провалидированны в форме
  return {
    ...instance,
  } as Values
}
