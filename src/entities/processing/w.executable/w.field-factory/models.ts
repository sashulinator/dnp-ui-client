import { type Any } from '~/utils/core'

import { type ParamSchema } from '../models'

export type ParamFactoryContext = {
  name: string
  columns: { name: string; display?: string; type?: string }[]
  paramSchema: ParamSchema
  isSingleMode: boolean
  setUniqValues?: ((getValue: (currentValue: unknown) => unknown, formName: string) => void) | undefined
  serializeFn: (params: Any) => Any
  deserializeFn: (params: Any) => Any
}
