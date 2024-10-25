import { generateId } from '~dnp/utils/core'
import type { Partial } from '~dnp/utils/types/object'

import { type CreateDictionaryTable } from '../../../models/dictionary-table'

export const defaultValues: Partial<CreateDictionaryTable, 'deep'> = {
  nav: false,
  defaultView: 'table',
  columns: [
    {
      id: generateId(3),
      type: 'string',
    },
  ],
}
