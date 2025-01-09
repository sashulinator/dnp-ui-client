import * as v from 'valibot'

/**
 * Base
 */

export const dcdatabase = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  display: v.string(),
  dcserviceId: v.pipe(v.string(), v.nonEmpty()),
})

export type Dcdatabase = v.InferOutput<typeof dcdatabase>

/**
 * CreateInput
 */

export const dcdatabaseCreateInput = v.omit(dcdatabase, ['id'])

export type DcdatabaseCreateInput = v.InferOutput<typeof dcdatabaseCreateInput>

/**
 * UpdateInput
 */

export const dcdatabaseUpdateInput = dcdatabase

export type DcdatabaseUpdateInput = v.InferOutput<typeof dcdatabaseUpdateInput>
