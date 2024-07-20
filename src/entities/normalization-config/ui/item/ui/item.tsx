import { Link } from 'react-router-dom'
import { NormalizationConfig } from '../../../types/normalization-config'
import './item.scss'
import { routes } from '~/shared/routes'
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

const displayName = 'normalizationConfig-Item'

/**
 * normalizationConfig-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item } = props

  return (
    <Card key={item.name} asChild={true} className={c(displayName, className)}>
      <Link to={routes.normalizationConfigs_name.getURL(item.name)}>
        <TextHighlighter tooltipContent='Название'>{item.name}</TextHighlighter>
        <Button round={true} color='red' className='trash-button' variant='soft'>
          <TrashIcon onClick={fns<[React.MouseEvent]>(stopPropagation, preventDefault)} />
        </Button>
      </Link>
    </Card>
  )
}

Component.displayName = displayName
