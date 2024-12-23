import { type ParamSchema } from '../models'

export type ParamFactoryContext = {
  name: string
  columns: { name: string; display?: string; type?: string }[]
  paramSchema: ParamSchema
  isSingleMode: boolean
}
