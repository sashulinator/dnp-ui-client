import React from 'react'

import Button from '~/shared/button'
import Heading from '~/shared/heading'
import Icon from '~/shared/icon'
import Link from '~/shared/link'
import TextHighlighter from '~/shared/text-highlighter'
import { c } from '~/utils/core'

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

  const { loading = false, backRoute, renderIcon } = useContext()

  return (
    <Button
      variant='soft'
      style={{ marginRight: 'var(--space-4)' }}
      square={true}
      disabled={false}
      className={c(className)}
      loading={loading}
      asChild={!loading}
    >
      {loading
        ? renderIcon && React.createElement(renderIcon)
        : backRoute && renderIcon && <Link to={backRoute.getUrl()}>{<Icon name='ChevronLeft' />}</Link>}
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
      <TextHighlighter tooltipContent={props.tooltipContent} style={{ marginLeft: 'var(--space-2)' }}>
        {props.string}
      </TextHighlighter>
    )
  )
}
