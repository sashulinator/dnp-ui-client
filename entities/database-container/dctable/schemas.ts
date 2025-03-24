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
  attributes: v.object({}),
})

/**
 * CreateInput
 */

export const dctableCreateInput = v.omit(dctable, ['id'])

/**
 * UpdateInput
 */

export const dctableUpdateInput = dctable

/**
 * Locator
 * Местонахождение таблицы
 */

export const dctableLocator = v.pick(dctable, ['name', 'dcserviceId', 'database', 'schema'])

/**
 * Meta
 */

export const dctableMeta = v.intersect([
  dctableLocator,
  v.object({
    display: v.optional(v.pipe(v.string(), v.nonEmpty())),
    columns: v.array(
      v.object({
        name: v.pipe(v.string(), v.nonEmpty()),
        type: v.pipe(v.string(), v.nonEmpty()),
        display: v.optional(v.pipe(v.string(), v.nonEmpty())),
      }),
    ),
  }),
])
