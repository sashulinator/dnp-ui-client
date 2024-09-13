import './item.scss'

import { querify } from '~/lib/api'
import { routes } from '~/old-shared/routes'
import Badge from '~/shared/badge'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import TextHighlighter from '~/shared/text-highlighter'
import { c } from '~/utils/core'

import { NormalizationConfig } from '../../../types/normalization-config'

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
      <Flex justify='between' asChild>
        <Link to={`${routes.normalizationConfigs_id.getURL(item.id)}${querify({ name: item.name })}`}>
          <Flex gap='2'>
            <TextHighlighter tooltipContent='Название'>{item.name}</TextHighlighter>
            <TextHighlighter tooltipContent='Версия' color='yellow'>
              {item.v}
            </TextHighlighter>
          </Flex>
          <Flex gap='2' align='center'>
            <Flex direction='column' align='end'>
              {item.last ? <Badge color='green'>Текущий</Badge> : <Badge color='red'>Архивный</Badge>}
            </Flex>
          </Flex>
        </Link>
      </Flex>
    </Card>
  )
}

Component.displayName = displayName
