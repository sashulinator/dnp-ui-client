import { type Any, type Dictionary } from '~/utils/core'

import { type ExecutableSchema, type ParamSchema } from './models'

export type GetParamsInitialValuesParams = {
  executableSchema: ExecutableSchema
  context: Omit<Context, 'paramSchema'>
}

export type Context = {
  columns: { name: string; display: string }[]
  generateId: () => string
  paramSchema: ParamSchema
}

export function getParamsInitialValues(params: GetParamsInitialValuesParams) {
  const { executableSchema, context } = params

  const initialParamsValue: Dictionary<Any> = {}

  for (let index = 0; index < executableSchema?.params?.length; index++) {
    const paramSchema = executableSchema?.params[index]

    if (paramSchema.getInitialValue) {
      initialParamsValue[paramSchema.name] = new Function('context', paramSchema.getInitialValue)({
        ...context,
        paramSchema,
      }) as Any
    }
  }

  return initialParamsValue
}
