import { type ForwardedRef, forwardRef } from 'react'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { c } from '~/utils/core'

import { SLICE } from '../constants/slice'

export interface Props extends LinkProps {}

export const NAME = `${SLICE}-Link`

export function Component(props: Props, ref: ForwardedRef<HTMLAnchorElement>): JSX.Element {
  const { className, ...linkProps } = props

  return <Link {...linkProps} ref={ref} className={c(className, NAME)} />
}

const ForwardRef = forwardRef(Component)
ForwardRef.displayName = NAME
export default ForwardRef
