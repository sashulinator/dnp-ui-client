import * as v from 'valibot'

/**
 * Base
 */

export const dcserviceSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  display: v.string(),
  host: v.pipe(v.string(), v.nonEmpty()),
  port: v.number(),
  username: v.pipe(v.string(), v.nonEmpty()),
  password: v.pipe(v.string(), v.nonEmpty()),
})

export type Dcservice = v.InferOutput<typeof dcserviceSchema>

/**
 * CreateInput
 */

export const dcserviceCreateInputSchema = v.omit(dcserviceSchema, ['id'])

export type DcserviceCreateInput = v.InferOutput<typeof dcserviceCreateInputSchema>

/**
 * UpdateInput
 */

export const dcserviceUpdateInputSchema = dcserviceSchema

export type DcserviceUpdateInput = v.InferOutput<typeof dcserviceUpdateInputSchema>
