import React, { useEffect, useState } from 'react'

import { SLICE } from './constants'
import { emitBinding } from './lib.emit-binding'
import type { Binding, BlockComponent, BlockNode, BlocksContext } from './models'

interface Props {
  block: BlockNode | string
  context: BlocksContext
  componentMap: Record<string, BlockComponent>
  bindings: Binding[] | undefined
}

export const NAME = `${SLICE}-BlockFactory`

export function Component(props: Props): React.ReactNode {
  const { block, componentMap, context, bindings } = props

  const [dynamicProps, setDynamicProps] = useState(
    typeof block === 'string' ? {} : context.blocksProps?.[block.id].props,
  )

  if (typeof block === 'string') return block

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => bindings?.forEach((binding) => emitBinding(binding, 'onMountBlock', block, context)), [])

  const blockComponent = componentMap[block.name as string]
  const renderComponent = blockComponent?.render || block.name

  const reactChildren = block.children?.map((child) => {
    const key = typeof child === 'string' ? child : child.id
    return <Component key={key} block={child} context={context} bindings={bindings} componentMap={componentMap} />
  })

  const componentProps: Record<string, unknown> = {
    ...dynamicProps,
    key: block.id,
  }

  const blockContext = {
    ...context,
    block,
    blockComponent,
    props: dynamicProps,
    setProps: setDynamicProps,
    emit: (eventName: string, eventContext: Record<string, unknown>) => {
      bindings?.forEach((binding) => emitBinding(binding, eventName, block, { ...blockContext, ...eventContext }))
    },
  }

  if (blockComponent?.passContextProp !== false) {
    componentProps.context = blockContext
  }

  return React.createElement(
    renderComponent,
    componentProps,
    reactChildren || (dynamicProps as { children?: string })?.children,
  )
}
