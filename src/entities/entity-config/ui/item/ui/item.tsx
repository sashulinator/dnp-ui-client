import { Link } from 'react-router-dom'
import { EntityConfig } from '../../../types/entities'
import './item.scss'
import Badge from '~/ui/badge'
// import { routes } from '~/shared/routes'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import TextHighlighter from '~/ui/text-highlighter'
import { c } from '~/utils/core'

export interface Props {
  className?: string | undefined
  item: EntityConfig
}

const displayName = 'entity-Item'

/**
 * entity-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Flex justify='between' direction='row' asChild={true}>
      <Card key={item.kn} asChild={true} className={c(displayName, className)}>
        {/* <Link to={`${routes.entitys_kn.getURL(item.kn)}`}> */}
        <Link to={'#'}>
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
