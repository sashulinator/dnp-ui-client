import { Link, LinkProps } from 'react-router-dom'

import { c } from '~/utils/core'

export interface Props extends LinkProps {
  className?: string | undefined
}

export const NAME = 'ui-Link'

/**
 * ui-Li
 */
export default function Component({ className, ...rest }: Props): JSX.Element {
  return (
    <Link className={c(className, NAME)} {...rest}>
      {rest.children}
    </Link>
  )
}

Component.displayName = NAME
