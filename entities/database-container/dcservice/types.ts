import type * as v from 'valibot'

import type { dcserviceCreateInputSchema, dcserviceSchema, dcserviceUpdateInputSchema } from './schemas'

/**
 * Base
 */

export type Dcservice = v.InferOutput<typeof dcserviceSchema>

/**
 * CreateInput
 */

export type DcserviceCreateInput = v.InferOutput<typeof dcserviceCreateInputSchema>

/**
 * UpdateInput
 */

export type DcserviceUpdateInput = v.InferOutput<typeof dcserviceUpdateInputSchema>
