import React from 'react'

import Flex from '~/shared/flex'
import { c } from '~/utils/core'

import { ContextProps, context } from '../models/context'

export interface Props extends Required<ContextProps> {
  className?: string | undefined
  children: React.ReactNode
}

export const NAME = 'explorer-Viewer'

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
