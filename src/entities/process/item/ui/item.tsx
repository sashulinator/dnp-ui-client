// import { Link } from 'react-router5'
import { Process } from '../../types/process'
import './item.scss'
import Button from '~/ui/button'
import Card from '~/ui/card'
import { TrashIcon } from '~/ui/icon'
import Text from '~/ui/text'
import TextHighlighter from '~/ui/text-highlighter'
import { c, fns } from '~/utils/core'
import { preventDefault, stopPropagation } from '~/utils/core-client'

export interface Props {
  className?: string | undefined
  item: Process
}

const displayName = 'process-Item'

/**
 * process-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Card key={item.id} asChild={false} className={c(displayName, className)}>
      <TextHighlighter tooltipContent='Название'>{item.id}</TextHighlighter>
      <TextHighlighter tooltipContent='Конфиг ID'>{item.normalizationConfigId}</TextHighlighter>

      <Text as='div' size='2' weight='bold'>
        Пользователь:{' '}
        <Text as='div' size='2' weight='bold'>
          {item.createdBy}
        </Text>
      </Text>
      <Text as='div' size='2' weight='bold'>
        Дата и время:{' '}
        <Text as='div' size='2' weight='bold'>
          {item.createdAt}
        </Text>
      </Text>
      <Button round={true} color='red' className='trash-button' variant='soft'>
        <TrashIcon onClick={fns<[React.MouseEvent]>(stopPropagation, preventDefault)} />
      </Button>
    </Card>
  )
}

Component.displayName = displayName
