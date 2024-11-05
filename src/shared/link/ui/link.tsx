import { Link } from '@radix-ui/themes'

import { type ForwardedRef, forwardRef } from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link as RRLink } from 'react-router-dom'

import { c } from '~/utils/core'

export interface Props extends LinkProps {}

export const NAME = 'ui-Link'

/**
 * ui-Li
 */
export function Component(props: Props, ref: ForwardedRef<HTMLAnchorElement>): JSX.Element {
  const { className, ...linkProps } = props

  return (
    <Link asChild>
      <RRLink {...linkProps} ref={ref} className={c(className, NAME)} />
    </Link>
  )
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef
