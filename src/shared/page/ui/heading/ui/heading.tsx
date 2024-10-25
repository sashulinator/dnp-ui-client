import React from 'react'

import Button from '~dnp/shared/button'
import Heading from '~dnp/shared/heading'
import Icon from '~dnp/shared/icon'
import Link from '~dnp/shared/link'
import { HighlightedText } from '~dnp/shared/text'
import { c } from '~dnp/utils/core'

import { type Context, context, useContext } from '../models/context'

/**
 * page-Heading-c-Root
 */

export interface RootProps extends Context {
  className?: string | undefined
  children: React.ReactNode
}

export const NAME = 'page-Heading-c-Root'

export function Root(props: RootProps): JSX.Element {
  const { children, className, ...contextProps } = props

  return (
    <context.Provider value={contextProps}>
      <Heading className={c(className, NAME)}>{children}</Heading>
    </context.Provider>
  )
}

Root.displayName = NAME

/**
 * page-Heading-c-BackToParent
 */

export interface BackToParentProps {
  className?: string | undefined
}

export function BackToParent(props: BackToParentProps): JSX.Element {
  const { className } = props

  const { backRoute, renderIcon } = useContext()

  return (
    <Button
      variant='soft'
      style={{ marginRight: 'var(--space-4)' }}
      square={true}
      className={c(className)}
      asChild={true}
    >
      {backRoute && renderIcon && <Link to={backRoute.getUrl()}>{<Icon name='ChevronLeft' />}</Link>}
    </Button>
  )
}

/**
 * page-Heading-c-Name
 */

export function Name(): JSX.Element | undefined | string {
  const { route } = useContext()
  return route?.getName()
}

/**
 * page-Heading-c-Unique
 */

export interface UniqueProps {
  string: string | undefined
  tooltipContent?: string | undefined
}

/**
 * Для выделения уникального значения заголовка
 */
export function Unique(props: UniqueProps): JSX.Element | undefined | string {
  return (
    props.string && (
      <HighlightedText tooltipContent={props.tooltipContent} style={{ marginLeft: 'var(--space-2)' }}>
        {props.string}
      </HighlightedText>
    )
  )
}
