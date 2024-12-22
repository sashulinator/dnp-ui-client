import type * as v from 'valibot'

import type { dctableCreateInputSchema, dctableSchema, dctableUpdateInputSchema } from './schemas'

/**
 * Dctable
 */

export type Dctable = v.InferOutput<typeof dctableSchema>

/**
 * CreateInput
 */

export type DctableCreateInput = v.InferOutput<typeof dctableCreateInputSchema>

/**
 * UpdateInput
 */

export type DctableUpdateInput = v.InferOutput<typeof dctableUpdateInputSchema>
