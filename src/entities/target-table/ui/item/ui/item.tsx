import './item.scss'

import { routes } from '~dnp/app/route'
import Card from '~dnp/shared/card'
import Flex from '~dnp/shared/flex'
import Link from '~dnp/shared/link'
import { HighlightedText } from '~dnp/shared/text'
import { c } from '~dnp/utils/core'

import { type TargetTable } from '../../../types/target-table'

export interface Props {
  className?: string | undefined
  item: TargetTable
}

const displayName = 'targetTable-Item'

/**
 * targetTable-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Flex justify='between' direction='row' asChild={true}>
      <Card key={item.kn} asChild={true} className={c(displayName, className)}>
        <Link to={`${routes.targetTables_kn.getUrl(item.kn)}`}>
          <Flex gap='2'>
            <HighlightedText tooltipContent='Название'>{item.kn}</HighlightedText>
          </Flex>
          <Flex gap='2' align='center'></Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
