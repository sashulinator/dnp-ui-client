import * as v from 'valibot'

/**
 * Dccolumn
 */

export const dccolumnSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  type: v.pipe(v.string(), v.nonEmpty()),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
  database: v.pipe(v.string(), v.nonEmpty()),
  table: v.pipe(v.string(), v.nonEmpty()),
})

export type Dccolumn = v.InferOutput<typeof dccolumnSchema>

/**
 * CreateInput
 */

export const dccolumnCreateInput = v.omit(dccolumnSchema, ['id'])

export type DccolumnCreateInput = v.InferOutput<typeof dccolumnCreateInput>

/**
 * UpdateInput
 */

export const dccolumnUpdateInput = dccolumnSchema

export type DccolumnUpdateInput = v.InferOutput<typeof dccolumnUpdateInput>
