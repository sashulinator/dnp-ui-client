import './item.scss'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import Flex, { type FlexProps } from '~/shared/flex'
import Link from '~/shared/link'
import Text, { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

import { type Dcservice } from '../../../models'

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
          <Flex direction='column'>
            <HighlightedText tooltipContent='Отображение'>{item.display}</HighlightedText>
            <Text style={{ marginLeft: 'var(--space-1)' }} color='gray' size='2'>
              {item.display}
            </Text>
          </Flex>
          <Flex gap='4' align='center'></Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
