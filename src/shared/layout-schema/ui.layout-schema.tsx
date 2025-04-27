import type { Block, ComponentWithMeta, Context } from './models'
import { BlockFactory } from './ui.block-factory'

export interface Props {
  rootBlock: Block
  context: Record<string, unknown>
  componentMap: Record<string, ComponentWithMeta>
}

export const NAME = `ui-layoutSchema`

/**
 * ui-ReactFactory'
 */
export default function Component(props: Props): React.ReactNode {
  const { rootBlock, context, componentMap } = props

  context['blocks'] = {}

  return <BlockFactory context={context as Context} componentMap={componentMap} block={rootBlock} />
}

Component.displayName = NAME
