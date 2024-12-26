import * as v from 'valibot'

export type Executable = {
  name: string
  params: Record<string, unknown>
}

/**
 * ExecutableSchema
 */

export const executableSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  sdkConfigName: v.pipe(v.string(), v.nonEmpty()),
  sdkConfigVersion: v.pipe(v.string(), v.nonEmpty()),
  version: v.pipe(v.string(), v.nonEmpty()),
  description: v.string(),
  params: v.array(v.lazy(() => paramSchema)),
})

export type ExecutableSchema = v.InferOutput<typeof executableSchema>

/**
 * CreateInput
 */

export const executableSchemaCreateInputSchema = v.omit(executableSchema, ['id'])

export type ExecutableSchemaCreateInput = v.InferOutput<typeof executableSchemaCreateInputSchema>

/**
 * UpdateInput
 */

export const executableSchemaUdateInputSchema = executableSchema

export type ExecutableSchemaUdateInput = v.InferOutput<typeof executableSchemaUdateInputSchema>

/**
 * ParamSchema
 */

const paramSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  description: v.string(),
  unique: v.optional(v.boolean()),
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
