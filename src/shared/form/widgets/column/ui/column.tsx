import Flex, { type FlexProps } from '~dnp/shared/flex'
import { c } from '~dnp/utils/core'

export type Props = Omit<FlexProps, 'direction'>

export const NAME = 'ui-Form-w-Column'

/**
 * ui-Form-w-Column'
 */
export default function Component(props: Props): JSX.Element {
  return <Flex direction='column' gap='4' {...props} className={c(props.className, NAME)} />
}

Component.displayName = NAME
