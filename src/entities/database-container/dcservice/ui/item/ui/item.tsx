import './item.scss'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import Flex, { type FlexProps } from '~/shared/flex'
import Link from '~/shared/link'
import { c } from '~/utils/core'

import { type Dcservice } from '../../../models'
import DccerviceCard from '../../card/ui.card'

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
          <DccerviceCard dcservice={item} />
          <Flex gap='4' align='center'></Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
