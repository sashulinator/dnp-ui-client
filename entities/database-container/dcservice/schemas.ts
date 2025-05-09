import * as v from 'valibot'

/**
 * Dcservice
 */

export const dcservice = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  display: v.nullable(v.pipe(v.string(), v.nonEmpty())),
  client: v.pipe(v.string(), v.nonEmpty()),
  host: v.pipe(v.string(), v.nonEmpty()),
  port: v.number(),
  username: v.pipe(v.string(), v.nonEmpty()),
  password: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateInput
 */

export const dcserviceCreateInput = v.omit(dcservice, ['id'])

/**
 * UpdateInput
 */

export const dcserviceUpdateInput = dcservice
