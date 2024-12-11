import * as v from 'valibot'

/**
 * Base
 */

export const procedureSchema = v.object({
  id: v.string(),
  name: v.string(),
  display: v.string(),
  description: v.string(),
  params: v.array(
    v.object({
      name: v.string(),
      display: v.string(),
      description: v.string(),
      component: v.object({
        name: v.string(),
        props: v.object({}),
      }),
    }),
  ),
})

export type Procedure = v.InferOutput<typeof procedureSchema>

/**
 * CreateInput
 */

export const procedureCreateInputSchema = v.omit(procedureSchema, ['id'])

export type ProcedureCreateInput = v.InferOutput<typeof procedureCreateInputSchema>

/**
 * UpdateInput
 */

export const procedureUdateInputSchema = procedureSchema

export type ProcedureUdateInput = v.InferOutput<typeof procedureUdateInputSchema>
