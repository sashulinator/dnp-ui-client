import { Link } from 'react-router-dom'
import { TargetTable } from '../../../types/target-table'
import './item.scss'
import { routes } from '~/shared/routes'
import Badge from '~/ui/badge'
// import { routes } from '~/shared/routes'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import TextHighlighter from '~/ui/text-highlighter'
import { c } from '~/utils/core'

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
        {/* <Link to={`${routes.targetTables_kn.getURL(item.kn)}`}> */}
        <Link to={`${routes.targetTables_kn.getURL(item.kn)}`}>
          <Flex gap='2'>
            <TextHighlighter tooltipContent='Название'>{item.kn}</TextHighlighter>
          </Flex>
          <Flex gap='2' align='center'>
            {item.nav && <Badge color='green'>Навигация</Badge>}
          </Flex>
        </Link>
      </Card>
    </Flex>
  )
}

Component.displayName = displayName
