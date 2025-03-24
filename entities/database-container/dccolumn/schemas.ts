import * as v from 'valibot'

/**
 * Dccolumn
 */

export const dccolumn = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.pipe(v.string(), v.nonEmpty()),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
  database: v.pipe(v.string(), v.nonEmpty()),
  table: v.pipe(v.string(), v.nonEmpty()),
  schema: v.pipe(v.string(), v.nonEmpty()),
  attributes: v.object({}),
})

/**
 * CreateInput
 */

export const dccolumnCreateInput = v.omit(dccolumn, ['id'])

/**
 * UpdateInput
 */

export const dccolumnUpdateInput = dccolumn

/**
 * Locator
 * Местонахождение Колонки
 */

export const dccolumnLocator = v.pick(dccolumn, ['name', 'dcserviceId', 'database', 'schema', 'table'])

/**
 * Meta
 */

export const dccolumnMeta = v.intersect([
  dccolumnLocator,
  v.object({
    display: v.optional(v.pipe(v.string(), v.nonEmpty())),
  }),
])
