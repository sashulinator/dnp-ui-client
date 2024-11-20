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
      <Heading.Root
        route={routes.analytics_findManyAndCountTables}
        backRoute={routes.analytics_findManyAndCountTables}
        renderIcon={routes.analytics_findManyAndCountTables.payload.renderIcon}
      >
        <Heading.BackToParent />
        <Heading.Name />
      </Heading.Root>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = NAME
export default Memoed
