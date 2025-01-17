import * as v from 'valibot'

/**
 * Schema
 */

export const dcschema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.string(),
  database: v.pipe(v.string(), v.nonEmpty()),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateSchema
 */

export const createDcschema = dcschema

/**
 * UpdateSchema
 */

export const updateDcschema = dcschema
