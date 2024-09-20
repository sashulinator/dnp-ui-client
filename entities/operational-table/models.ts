import * as v from 'valibot'

import { getObjectKeys } from '~/common/lib/get-object-keys'
import { crudableSchema } from '~/common/models/crudable'
import { schemaItemModel } from '~/common/shared/working-table/model/model'

import { userSchema } from '../user'

/**
 * BaseOperationalTable
 */

export const baseOperationalTableSchema = v.object({
  kn: v.string(),
  name: v.string(),
  nav: v.boolean(),
  tableName: v.string(),
  tableSchema: v.lazy(() => tableSchemaSchema),
  // meta
  ...crudableSchema.entries,
})

export type BaseOperationalTable = v.InferOutput<typeof baseOperationalTableSchema>

/**
 * Relations
 */

export const operationalTableRelationsSchema = v.object({
  createdBy: userSchema,
  updatedBy: userSchema,
})

export type OperationalTableRelations = v.InferOutput<typeof operationalTableRelationsSchema>

/**
 * OperationalTable
 */

export const operationalTableSchema = v.intersect([baseOperationalTableSchema, operationalTableRelationsSchema])

export type OperationalTable = v.InferOutput<typeof operationalTableSchema>

/**
 * CreateOperationalTable
 */

export const createOperationalTableSchema = v.omit(baseOperationalTableSchema, getObjectKeys(crudableSchema.entries))

export type CreateOperationalTable = v.InferOutput<typeof createOperationalTableSchema>

/**
 * UpdateOperationalTable
 */

export const updateOperationalTableSchema = v.omit(baseOperationalTableSchema, getObjectKeys(crudableSchema.entries))

export type UpdateOperationalTable = v.InferOutput<typeof updateOperationalTableSchema>

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
  ...schemaItemModel.entries,
  relation: v.optional(
    v.object({
      type: v.union([v.literal('operationalTable'), v.literal('dictionaryTable')]),
      columnName: v.string(),
      kn: v.string(), // key name
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
