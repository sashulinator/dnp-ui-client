import * as v from 'valibot'

/**
 * Base
 */

export const dcdatabaseSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.string(),
  serviceId: v.pipe(v.string(), v.nonEmpty()),
})

export type Dcdatabase = v.InferOutput<typeof dcdatabaseSchema>

/**
 * CreateInput
 */

export const dcdatabaseCreateInputSchema = v.omit(dcdatabaseSchema, ['id'])

export type DcdatabaseCreateInput = v.InferOutput<typeof dcdatabaseCreateInputSchema>

/**
 * UpdateInput
 */

export const dcdatabaseUpdateInputSchema = dcdatabaseSchema

export type DcdatabaseUpdateInput = v.InferOutput<typeof dcdatabaseUpdateInputSchema>
