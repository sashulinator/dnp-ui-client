import type * as v from 'valibot'

import type { dcdatabase, dcdatabaseCreateInput, dcdatabaseUpdateInput } from './schemas'

/**
 * Base
 */

export type Dcdatabase = v.InferOutput<typeof dcdatabase>

/**
 * CreateInput
 */

export type DcdatabaseCreateInput = v.InferOutput<typeof dcdatabaseCreateInput>

/**
 * UpdateInput
 */

export type DcdatabaseUpdateInput = v.InferOutput<typeof dcdatabaseUpdateInput>
