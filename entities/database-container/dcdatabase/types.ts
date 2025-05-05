import type * as v from 'valibot'

import type { dcdatabase, dcdatabaseCreateInput, dcdatabaseLocator, dcdatabaseUpdateInput } from './schemas'

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

/**
 * Locator
 */

export type DcdatabaseLocator = v.InferOutput<typeof dcdatabaseLocator>

/**
 * Value
 * Для таких компонентов как picker
 * 🔴 У Dcdatabase уникален id, у Database уникален name
 */

export type DatabaseValue = {
  name: string
  display?: string | undefined
}

export type DcdatabaseValue = {
  id: string
  name?: string | undefined
  display?: string | undefined
}
