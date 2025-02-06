import type * as v from 'valibot'

import type { dccolumn, dccolumnCreateInput, dccolumnLocator, dccolumnMeta, dccolumnUpdateInput } from './schemas'

/**
 * Dccolumn
 */

export type Dccolumn = v.InferOutput<typeof dccolumn>

/**
 * CreateInput
 */

export type DccolumnCreateInput = v.InferOutput<typeof dccolumnCreateInput>

/**
 * UpdateInput
 */

export type DccolumnUpdateInput = v.InferOutput<typeof dccolumnUpdateInput>

/**
 * Locator
 */

export type DccolumnLocator = v.InferOutput<typeof dccolumnLocator>

/**
 * Meta
 */

export type DccolumnMeta = v.InferOutput<typeof dccolumnMeta>
