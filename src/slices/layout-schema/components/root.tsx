import { memo } from 'react'

import Flex, { type Props as FlexProps } from './flex'

const NAME = 'dnp-layoutSchema-root'

type Props = FlexProps

function Component(props: Props): React.ReactNode {
  return <Flex {...props} />
}

const Root = memo(Component)
Root.displayName = NAME
export default Root
