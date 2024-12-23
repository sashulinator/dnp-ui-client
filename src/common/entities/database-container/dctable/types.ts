import type * as v from 'valibot'

import type { dctable, dctableCreateInput, dctableUpdateInput } from './schemas'

/**
 * Dctable
 */

export type Dctable = v.InferOutput<typeof dctable>

/**
 * CreateInput
 */

export type DctableCreateInput = v.InferOutput<typeof dctableCreateInput>

/**
 * UpdateInput
 */

export type DctableUpdateInput = v.InferOutput<typeof dctableUpdateInput>
