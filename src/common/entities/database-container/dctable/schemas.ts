import * as v from 'valibot'

/**
 * Base
 */

export const dctable = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
  database: v.pipe(v.string(), v.nonEmpty()),
  schema: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateInput
 */

export const dctableCreateInput = v.omit(dctable, ['id'])

/**
 * UpdateInput
 */

export const dctableUpdateInput = dctable
