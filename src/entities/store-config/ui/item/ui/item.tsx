import { StoreConfig } from '../../../types/store-config'
import './item.scss'
import Button from '~/ui/button'
import Card from '~/ui/card'
import { TrashIcon } from '~/ui/icon'
import TextHighlighter from '~/ui/text-highlighter'
import { c, fns } from '~/utils/core'
import { preventDefault, stopPropagation } from '~/utils/core-client'

export interface Props {
  className?: string | undefined
  item: StoreConfig
}

const displayName = 'storeConfig-Item'

/**
 * storeConfig-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Card key={item.keyname} asChild={false} className={c(displayName, className)}>
      <TextHighlighter tooltipContent='Название'>{item.keyname}</TextHighlighter>
      <Button round={true} color='red' className='trash-button' variant='soft'>
        <TrashIcon onClick={fns<[React.MouseEvent]>(stopPropagation, preventDefault)} />
      </Button>
    </Card>
  )
}

Component.displayName = displayName
