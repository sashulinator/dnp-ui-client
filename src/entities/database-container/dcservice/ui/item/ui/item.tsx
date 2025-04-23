import './item.scss'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import Flex, { type FlexProps } from '~/shared/flex'
import Link from '~/shared/link'
import { WithAvatar } from '~/shared/view'
import { c, capitalize } from '~/utils/core'

import { type Dcservice } from '../../../types'

export type Props = FlexProps & {
  className?: string | undefined
  item: Dcservice
}

const displayName = 'dictionaryTable-Item'

/**
 * dictionaryTable-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item, ...flexProps } = props

  return (
    <Flex justify='between' direction='row' asChild={true} {...flexProps}>
      <Card asChild={true} className={c(displayName, className)}>
        <Link to={`${routes.dcservice_getById.getUrl(item.id)}`}>
          <WithAvatar
            width='100%'
            iconName={capitalize(item.client) as 'Postgres'}
            title={item.display}
            subtitle={`${item.host}:${item.port}`}
          />
          <Flex gap='4' align='center'></Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
