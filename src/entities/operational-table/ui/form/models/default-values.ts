import { generateId } from '~/utils/core'
import { type Partial } from '~/utils/types/object'

import { type CreateOperationalTable } from '../../../types/operational-table'

export const defaultValues: Partial<CreateOperationalTable, 'deep'> = {
  nav: false,
  defaultView: 'table',
  columns: [
    {
      id: generateId(3),
      type: 'string',
    },
  ],
}
