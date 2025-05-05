import * as v from 'valibot'

/**
 * LayoutSchema
 */

export const layoutSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  data: v.lazy(() => block),
})

/**
 * Из-за того что тип ссылается сам на себя, то приходится
 * сначала обьявить тип и использовать v.GenericSchema
 * Смотри "Lazy schema" по ссылке
 * https://valibot.dev/guides/other/
 */
export interface Block {
  id: string
  name: string
  props: Record<string, unknown>
  children?: BlockNode[]
}

export const block: v.GenericSchema<Block> = v.object({
  id: v.pipe(v.string(), v.nonEmpty()),
  name: v.pipe(v.string(), v.nonEmpty()),
  props: v.object({}),
  children: v.array(v.lazy(() => blockNode)),
})

export const blockNode = v.array(v.union([v.lazy(() => block), v.string()]))

export type BlockNode = v.InferOutput<typeof blockNode>
