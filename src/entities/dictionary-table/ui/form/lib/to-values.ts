import { Partial } from '~/utils/types/object'

import { CreateDictionaryTable } from '../../../types/dictionary-table'
import { Values } from '../types/values'

export function toValues(instance: Partial<CreateDictionaryTable, 'deep'>): Values {
  // Можем скастовать as Values т.к. значения будут провалидированны в форме
  return {
    ...instance,
  } as Values
}
