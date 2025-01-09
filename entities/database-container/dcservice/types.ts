import type * as v from 'valibot'

import type { dcservice, dcserviceCreateInput, dcserviceUpdateInput } from './schemas'

/**
 * Dcservice
 */

export type Dcservice = v.InferOutput<typeof dcservice>

/**
 * CreateInput
 */

export type DcserviceCreateInput = v.InferOutput<typeof dcserviceCreateInput>

/**
 * UpdateInput
 */

export type DcserviceUpdateInput = v.InferOutput<typeof dcserviceUpdateInput>
