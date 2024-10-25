import Card, { CardProps } from '~dnp/shared/card'
import { c } from '~dnp/utils/core'

export type Props = CardProps

export const NAME = 'ui-Form-w-Card'

/**
 * ui-Form-w-Card'
 */
export default function Component(props: Props): JSX.Element {
  return <Card size='4' {...props} className={c(props.className, NAME)} />
}

Component.displayName = NAME
