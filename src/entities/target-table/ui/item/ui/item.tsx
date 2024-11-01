import './item.scss'

import { routes } from '~/app/route'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

import { type TargetTable } from '../../../types/target-table'

export interface Props {
  className?: string | undefined
  item: TargetTable
}

const displayName = 'dnp-targetTable-Item'

/**
 * dnp-targetTable-Item
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
