import Flex, { FlexProps } from '~/ui/flex'
import { c } from '~/utils/core'

export type Props = Omit<FlexProps, 'direction'>

export const NAME = 'ui-Form-w-Row'

/**
 * ui-Form-w-Row'
 */
export default function Component(props: Props): JSX.Element {
  return <Flex direction='row' gap='6' {...props} className={c(props.className, NAME)} />
}

Component.displayName = NAME
