import type * as v from 'valibot'

import type { dcschema, dcschemaCreateInput, dcschemaUpdateInput } from './schema'

/**
 * Schema
 */

export type Dcschema = v.InferOutput<typeof dcschema>

/**
 * CreateSchema
 */

export type DcschemaCreateInput = v.InferOutput<typeof dcschemaCreateInput>

/**
 * UpdateSchema
 */

export type DcschemaUpdateInput = v.InferOutput<typeof dcschemaUpdateInput>
