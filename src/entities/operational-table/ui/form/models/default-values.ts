import { type CreateOperationalTable } from '../../../types/operational-table'
import { generateId } from '~/utils/core'
import { Partial } from '~/utils/types/object'

export const defaultValues: Partial<CreateOperationalTable, 'deep'> = {
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
