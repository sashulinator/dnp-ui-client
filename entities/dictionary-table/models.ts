import * as v from 'valibot'

import { getObjectKeys } from '~/common/lib/get-object-keys'
import { crudableSchema } from '~/common/models/crudable'

import { userSchema } from '../user'

/**
 * BaseDictionaryTable
 */

export const baseDictionaryTableSchema = v.object({
  kn: v.string(),
  name: v.string(),
  nav: v.boolean(),
  tableName: v.string(),
  tableSchema: v.lazy(() => tableSchemaSchema),
  // meta
  ...crudableSchema.entries,
})

export type BaseDictionaryTable = v.InferOutput<typeof baseDictionaryTableSchema>

/**
 * Relations
 */

export const dictionaryTableRelationsSchema = v.object({
  createdBy: userSchema,
  updatedBy: userSchema,
})

export type DictionaryTableRelations = v.InferOutput<typeof dictionaryTableRelationsSchema>

/**
 * DictionaryTable
 */

export const dictionaryTableSchema = v.intersect([baseDictionaryTableSchema, dictionaryTableRelationsSchema])

export type DictionaryTable = v.InferOutput<typeof dictionaryTableSchema>

/**
 * CreateDictionaryTable
 */

export const createDictionaryTableSchema = v.omit(baseDictionaryTableSchema, getObjectKeys(crudableSchema.entries))

export type CreateDictionaryTable = v.InferOutput<typeof createDictionaryTableSchema>

/**
 * UpdateDictionaryTable
 */

export const updateDictionaryTableSchema = v.omit(baseDictionaryTableSchema, getObjectKeys(crudableSchema.entries))

export type UpdateDictionaryTable = v.InferOutput<typeof updateDictionaryTableSchema>

/**
 * TableSchema
 */

export const tableSchemaSchema = v.object({
  defaultView: v.union([v.literal('tree'), v.literal('table')]),
  items: v.array(v.lazy(() => tableSchemaItemSchema)),
})

export type TableSchema = v.InferOutput<typeof tableSchemaSchema>

/**
 * TableSchemaItem
 */

export const tableSchemaItemSchema = v.object({
  id: v.string(),
  name: v.string(),
  columnName: v.string(),
  defaultTo: v.optional(v.string()),
  index: v.optional(v.boolean()),
  nullable: v.optional(v.boolean()),
  type: v.string(),
  relation: v.optional(
    v.object({
      type: v.union([v.literal('dictionary'), v.literal('operationalTable')]),
      columnName: v.string(),
      kn: v.string(),
    }),
  ),
})

export type TableSchemaItem = v.InferOutput<typeof tableSchemaItemSchema>

/**
 * Row
 */

export const rowSchema = v.objectWithRest(
  {
    _id: v.string(),
    _status: v.string(),
  },
  v.string(),
)

export type Row = v.InferOutput<typeof rowSchema>
