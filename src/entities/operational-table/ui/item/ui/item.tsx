import { Link } from 'react-router-dom'
import { OperationalTable } from '../../../types/operational-table'
import './item.scss'
import { routes } from '~/shared/routes'
import Badge from '~/ui/badge'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import TextHighlighter from '~/ui/text-highlighter'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  item: OperationalTable
}

const displayName = 'operationalTable-Item'

/**
 * operationalTable-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Flex justify='between' direction='row' asChild={true}>
      <Card key={item.kn} asChild={true} className={c(displayName, className)}>
        <Link to={`${routes.operationalTables_kn.getURL(item.kn)}`}>
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
