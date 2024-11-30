import { memo } from 'react'

import { routes } from '~/app/route'
import { RenderCounter } from '~/shared/debug'
import Flex from '~/shared/flex'
import { Heading } from '~/shared/page'

export interface Props {}

const NAME = 'analytics-page-Heading'

function Component(): JSX.Element {
  return (
    <Flex width='100%' justify='between'>
      <RenderCounter name='heading' />
      <Heading.Root route={routes.rawData_findManyAndCountTables} backRoute={routes.rawData_findManyAndCountTables}>
        <Heading.BackToParent />
        <Heading.Name />
      </Heading.Root>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = NAME
export default Memoed
