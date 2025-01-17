import type * as v from 'valibot'

import type { createDcschema, dcschema, updateDcschema } from './schema'

/**
 * Schema
 */

export type Dcschema = v.InferOutput<typeof dcschema>

/**
 * CreateSchema
 */

export type CreateDcschema = v.InferOutput<typeof createDcschema>

/**
 * UpdateSchema
 */

export type UpdateDcschema = v.InferOutput<typeof updateDcschema>
