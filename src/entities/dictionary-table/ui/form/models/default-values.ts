import { generateId } from '~/utils/core'
import type { Partial } from '~/utils/types/object'

import { type CreateDictionaryTable } from '../../../models/dictionary-table'

export const defaultValues: Partial<CreateDictionaryTable, 'deep'> = {
  nav: false,
  tableSchema: {
    defaultView: 'table',
    items: [
      {
        id: generateId(3),
        type: 'string',
      },
    ],
  },
}
