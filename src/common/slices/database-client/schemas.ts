import * as v from 'valibot'

/**
 * DatabaseClientConfig
 */

export const databaseClientConfig = v.object({
  client: v.pipe(v.string(), v.nonEmpty()),
  username: v.pipe(v.string(), v.nonEmpty()),
  password: v.pipe(v.string(), v.nonEmpty()),
  host: v.pipe(v.string(), v.nonEmpty()),
  port: v.pipe(v.number(), v.integer()),
})

/**
 * Table
 */

export const table = v.object({
  name: v.pipe(v.string(), v.nonEmpty()),
  schema: v.pipe(v.string(), v.nonEmpty()),
})

/**
 * Column
 */

const _columnTypeSchema = v.variant('type', [
  v.object({
    type: v.literal('increments'),
  }),
  v.object({
    type: v.literal('string'),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('integer'),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('number'),
    decimalPlaces: v.optional(v.number()),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('float'),
    decimalPlaces: v.optional(v.number()),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('byte'),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('short'),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('long'),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('double'),
    decimalPlaces: v.optional(v.number()),
    isNegativeAllowed: v.optional(v.boolean()),
    maxLength: v.optional(v.number()),
  }),
  v.object({
    type: v.literal('boolean'),
  }),
  v.object({
    type: v.literal('date'),
  }),
])

export const column = v.intersect([
  _columnTypeSchema,
  v.object({
    name: v.string(),
    defaultTo: v.optional(v.string()),
    index: v.optional(v.boolean()),
    primary: v.optional(v.boolean()),
    nullable: v.optional(v.boolean()),
    unique: v.optional(v.boolean()),
    relation: v.optional(v.lazy(() => relation)),
  }),
])

/**
 * Relation
 */

export const relation = v.object({
  table: v.string(),
  column: v.string(),
})
