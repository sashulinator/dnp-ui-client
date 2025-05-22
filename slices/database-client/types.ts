import type * as v from 'valibot'

import type { column, databaseClientConfig, relation, table } from './schemas'

/**
 * DatabaseClientConfig
 */

export type DatabaseClientConfig = v.InferOutput<typeof databaseClientConfig>

/**
 * Table
 */

export type Table = v.InferOutput<typeof table>

/**
 * Column
 */

export type Column = v.InferOutput<typeof column>

/**
 * Row
 */

export type Row = Record<string | number, unknown>

/**
 * Relation
 */

export type Relation = v.InferOutput<typeof relation>
