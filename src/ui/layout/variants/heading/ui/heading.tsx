import { useContext } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { ContextProps, context } from '../models/context'
import Button from '~/ui/button'
import Heading from '~/ui/heading'
import Icon from '~/ui/icon'
import TextHighlighter from '~/ui/text-highlighter'
import { c } from '~/utils/core'

export interface Props extends Required<ContextProps> {
  className?: string | undefined
  children: React.ReactNode
}

export const ROOT_NAME = 'ui-Layout-v-Heading_Root'

/**
 * ui-Layout-v-Heading
 */
export default function Root(props: Props): JSX.Element {
  const { children, className, ...contextProps } = props

  return (
    <context.Provider value={contextProps}>
      <Heading className={c(className, ROOT_NAME)}>{children}</Heading>
    </context.Provider>
  )
}

Root.displayName = ROOT_NAME

/**
 * BackToParent
 */

export const BACK_TO_PARENT_NAME = 'ui-Layout-v-Heading_BackToParent'

export function BackToParent(props: { className?: string | undefined }): JSX.Element {
  const { className } = props

  const { loading = false, backRoute, renderIcon } = useContext(context)

  return (
    <Button
      variant='soft'
      style={{ marginRight: 'var(--space-4)' }}
      square={true}
      disabled={false}
      className={c(className, BACK_TO_PARENT_NAME)}
      loading={loading}
      asChild={!loading}
    >
      {loading
        ? renderIcon && React.createElement(renderIcon)
        : backRoute && renderIcon && <Link to={backRoute.getURL()}>{<Icon name='ChevronLeft' />}</Link>}
    </Button>
  )
}

BackToParent.displayName = BACK_TO_PARENT_NAME

/**
 * Name
 */

export const NAME_NAME = 'ui-Layout-v-Heading_Name'

export function Name(): JSX.Element | undefined | string {
  const { route } = useContext(context)
  return route?.getName()
}

Name.displayName = NAME_NAME

/**
 * Uniq
 */

export const UNIQ_NAME = 'ui-Layout-v-Heading_Uniq'

export function Uniq(props: { string: string; tooltipContent?: string | undefined }): JSX.Element | undefined | string {
  return (
    props.string && (
      <TextHighlighter tooltipContent={props.tooltipContent} style={{ marginLeft: 'var(--space-2)' }}>
        {props.string}
      </TextHighlighter>
    )
  )
}

Uniq.displayName = UNIQ_NAME
