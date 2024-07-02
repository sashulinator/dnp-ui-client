import { Link } from 'react-router5'
import { NormalizationConfig } from '../../../types/normalization-config'
import './item.scss'
import Button from '~/ui/button'
import Card from '~/ui/card'
import { TrashIcon } from '~/ui/icon'
import TextHighlighter from '~/ui/text-highlighter'
import { c, fns } from '~/utils/core'
import { preventDefault, stopPropagation } from '~/utils/core-client'

export interface Props {
  className?: string | undefined
  item: NormalizationConfig
}

const displayName = 'uni-Item'

/**
 * uni-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Card key={item.name} asChild={true} className={c(displayName, className)}>
      <Link routeName='normalizationConfigs_name' routeParams={{ name: item.name }}>
        <TextHighlighter tooltipContent='Название'>{item.name}</TextHighlighter>
        <Button round={true} color='red' className='trash-button' variant='soft'>
          <TrashIcon onClick={fns<[React.MouseEvent]>(stopPropagation, preventDefault)} />
        </Button>
      </Link>
    </Card>
  )
}

Component.displayName = displayName
