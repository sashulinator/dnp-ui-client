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

/**
 * Value
 * Для таких компонентов как picker
 */

export type DcserviceValue = {
  id: string
  display: string | undefined
  client?: string | undefined
  host?: string | undefined
  port?: number | undefined
}
