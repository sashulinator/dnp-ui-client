import { type Any, type Dictionary } from '~/utils/core'

import { type ExecutableDesign, type ParamDesign } from './models'

export type GetParamsInitialValuesParams = {
  executableDesign: ExecutableDesign
  context: Omit<Context, 'paramDesign'>
}

export type Context = {
  columns: { name: string; display: string }[]
  generateId: () => string
  paramDesign: ParamDesign
}

export function getParamsInitialValues(params: GetParamsInitialValuesParams) {
  const { executableDesign, context } = params

  const initialParamsValue: Dictionary<Any> = {}

  for (let index = 0; index < executableDesign?.params?.length; index++) {
    const paramDesign = executableDesign?.params[index]

    if (paramDesign.getInitialValue) {
      initialParamsValue[paramDesign.name] = new Function('context', paramDesign.getInitialValue)({
        ...context,
        paramDesign,
      }) as Any
    }
  }

  return initialParamsValue
}
