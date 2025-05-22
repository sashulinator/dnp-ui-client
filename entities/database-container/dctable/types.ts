import type * as v from 'valibot'

import type { Optional } from '~/utils/types/object'

import type { dctable, dctableCreateInput, dctableLocator, dctableMeta, dctableUpdateInput } from './schemas'

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

/**
 * Locator
 */

export type DctableLocator = v.InferOutput<typeof dctableLocator>

/**
 * Meta
 */

export type DctableMeta = v.InferOutput<typeof dctableMeta>

/**
 * DctableWithTable
 */

export type DctableWithTable = Omit<Optional<Dctable>, 'name' | 'schema'> & { name: string; schema: string }
