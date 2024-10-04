import React from 'react'

import Flex from '~/shared/flex'
import { c } from '~/utils/core'

import type { ContextProps } from '../models/context'
import { context } from '../models/context'

export interface Props extends ContextProps {
  className?: string | undefined
  children: React.ReactNode
}

export const NAME = 'explorer-Viewer-c-Root'

/**
 * explorer-Viewer
 */
export default function Component(props: Props): JSX.Element {
  const { children, className, ...contextProps } = props

  return (
    <context.Provider value={contextProps}>
      <Flex direction='column' gap='4' width='100%' className={c(className, NAME)}>
        {children}
      </Flex>
    </context.Provider>
  )
}

Component.displayName = NAME
