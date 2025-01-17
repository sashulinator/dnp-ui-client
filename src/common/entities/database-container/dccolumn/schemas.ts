import * as v from 'valibot'

/**
 * Dccolumn
 */

export const dccolumn = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  type: v.pipe(v.string(), v.nonEmpty()),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
  database: v.pipe(v.string(), v.nonEmpty()),
  table: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * CreateInput
 */

export const dccolumnCreateInput = v.omit(dccolumn, ['id'])

/**
 * UpdateInput
 */

export const dccolumnUpdateInput = dccolumn
