import { type ParamDesign } from '../models'

export type ParamFactoryContext = {
  name: string
  columns: { name: string; display: string; type: string }[]
  paramDesign: ParamDesign
  isSingleMode: boolean
}
