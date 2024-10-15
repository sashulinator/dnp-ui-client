import { generateId } from '~/utils/core'
import type { Partial } from '~/utils/types/object'

import { type CreateTargetTable } from '../../../types/target-table'

export const defaultValues: Partial<CreateTargetTable, 'deep'> = {
  nav: false,
  defaultView: 'table',
  items: [
    {
      id: generateId(3),
      type: 'string',
    },
  ],
}
