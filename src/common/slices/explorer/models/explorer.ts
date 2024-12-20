import * as v from 'valibot'

/**
 * Explorer
 */

export const explorerSchema = v.object({
  paths: v.array(v.lazy(() => pathSchema)),
  name: v.pipe(v.string(), v.nonEmpty()),
  items: v.array(v.object({})),
  total: v.number(),
  // Название ключа в items.data который является id
  idKey: v.union([v.number(), v.string()]),
  columns: v.array(v.lazy(() => columnSchema)),
})

export type Explorer<TItem extends Item = Item> = Omit<v.InferOutput<typeof explorerSchema>, 'items'> & {
  items: TItem[]
}

/**
 * Column
 */

export const columnSchema = v.object({
  name: v.string(),
  type: v.string(),
})

export type Column = v.InferOutput<typeof columnSchema>

/**
 * Item
 */

export const itemSchema = v.object({})

export type Item = v.InferOutput<typeof itemSchema>

/**
 * type
 */
export const typeSchema = v.union([v.literal('postgres'), v.literal('s3'), v.literal('table'), v.literal('row')])

export type Type = v.InferOutput<typeof typeSchema>

/**
 * Path
 */

export const pathSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  type: v.lazy(() => v.union([v.literal('postgres'), v.literal('s3'), v.literal('table'), v.literal('row')])),
})

export type Path = v.InferOutput<typeof pathSchema>

/**
 * StoreConfig
 */

export const storeConfigSchema = v.object({
  username: v.pipe(v.string(), v.nonEmpty()),
  password: v.pipe(v.string(), v.nonEmpty()),
  host: v.pipe(v.string(), v.nonEmpty()),
  port: v.pipe(v.string(), v.nonEmpty()),
})

export type StoreConfig = v.InferOutput<typeof storeConfigSchema>
