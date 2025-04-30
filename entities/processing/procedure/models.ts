import * as v from 'valibot'

export type Executable = {
  name: string
  params: Record<string, unknown>
}

/**
 * ExecutableSchema
 */

export const procedure = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  sdkConfigName: v.pipe(v.string(), v.nonEmpty()),
  sdkConfigVersion: v.pipe(v.string(), v.nonEmpty()),
  version: v.pipe(v.string(), v.nonEmpty()),
  description: v.string(),
  params: v.array(v.lazy(() => paramSchema)),
})

export type Procedure = v.InferOutput<typeof procedure>

/**
 * CreateInput
 */

export const procedureCreateInput = v.omit(procedure, ['id'])

export type ProcedureCreateInput = v.InferOutput<typeof procedureCreateInput>

/**
 * UpdateInput
 */

export const procedureUdateInput = procedure

export type ProcedureUdateInput = v.InferOutput<typeof procedureUdateInput>

/**
 * ParamSchema
 */

const paramSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  description: v.string(),
  unique: v.optional(v.boolean()),
  multi: v.optional(v.boolean()),
  multiHidden: v.optional(v.boolean()),
  getInitialValue: v.optional(v.string()),
  component: v.optional(v.lazy(() => componentSchema)),
})

export type ParamSchema = v.InferOutput<typeof paramSchema>

const componentSchema = v.object({
  name: v.string(),
  props: v.object({}),
  serialize: v.optional(v.string()),
  deserialize: v.optional(v.string()),
  singleModeProps: v.object({}),
  multiModeProps: v.object({}),
})

export type ComponentSchema = v.InferOutput<typeof componentSchema>
