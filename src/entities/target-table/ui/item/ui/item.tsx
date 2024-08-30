import './item.scss'

import { routes } from '~/shared/routes'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import Link from '~/ui/link'
import TextHighlighter from '~/ui/text-highlighter'
import { c } from '~/utils/core'

import { TargetTable } from '../../../types/target-table'

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
        <Link to={`${routes.targetTables_kn.getURL(item.kn)}`}>
          <Flex gap='2'>
            <TextHighlighter tooltipContent='Название'>{item.kn}</TextHighlighter>
          </Flex>
          <Flex gap='2' align='center'></Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
