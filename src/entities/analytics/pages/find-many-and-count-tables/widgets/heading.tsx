import { memo } from 'react'

import { routes } from '~/app/route'
import { RenderCounter } from '~/shared/debug'
import Flex from '~/shared/flex'
import { Heading } from '~/shared/page'

export interface Props {
  name: string
}

const NAME = 'analytics-page-Heading'

function Component(props: Props): JSX.Element {
  const { name } = props

  return (
    <Flex width='100%' justify='between'>
      <RenderCounter name='heading' />
      <Heading.Root
        route={routes.analytics_findManyAndCountTables}
        backRoute={routes.analytics_findManyAndCountTables}
        renderIcon={routes.analytics_findManyAndCountTables.payload.renderIcon}
      >
        <Heading.BackToParent />
        <Heading.Unique string={name} tooltipContent={routes.analytics_findManyAndCountTables.getName()} />
      </Heading.Root>
    </Flex>
  )
}

const Memoed = memo(Component)
Memoed.displayName = NAME
export default Memoed
