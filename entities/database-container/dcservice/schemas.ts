import * as v from 'valibot'

/**
 * Dcservice
 */

export const dcserviceSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  host: v.pipe(v.string(), v.nonEmpty()),
  port: v.number(),
  username: v.pipe(v.string(), v.nonEmpty()),
  password: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateInput
 */

export const dcserviceCreateInputSchema = v.omit(dcserviceSchema, ['id'])

/**
 * UpdateInput
 */

export const dcserviceUpdateInputSchema = dcserviceSchema
