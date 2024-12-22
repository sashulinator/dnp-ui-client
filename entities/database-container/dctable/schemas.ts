import * as v from 'valibot'

/**
 * Base
 */

export const dctableSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  serviceId: v.pipe(v.string(), v.nonEmpty()),
  database: v.pipe(v.string(), v.nonEmpty()),
  schema: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateInput
 */

export const dctableCreateInputSchema = v.omit(dctableSchema, ['id'])

/**
 * UpdateInput
 */

export const dctableUpdateInputSchema = dctableSchema
