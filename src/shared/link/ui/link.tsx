import { Link, LinkProps } from 'react-router-dom'

import { c } from '~dnp/utils/core'

export interface Props extends LinkProps {}

export const NAME = 'ui-Link'

/**
 * ui-Li
 */
export default function Component(props: Props): JSX.Element {
  const { className, ...linkProps } = props

  return <Link {...linkProps} className={c(className, NAME)} />
}

Component.displayName = NAME
