import { type ExecutableParamDesign } from '../models'

export type ParamFactoryContext = {
  name: string
  columns: { name: string; display: string; type: string }[]
  paramDesign: ExecutableParamDesign
  isSingleMode: boolean
}
