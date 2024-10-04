import './item.scss'

import { routes } from '~/app/route'
import { querify } from '~/shared/api'
import Badge from '~/shared/badge'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Link from '~/shared/link'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

import { type NormalizationConfig } from '../../../types/normalization-config'

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
        <Link to={`${routes.normalizationConfigs_id.getUrl(item.id)}${querify({ name: item.name })}`}>
          <Flex gap='2'>
            <HighlightedText tooltipContent='Название'>{item.name}</HighlightedText>
            <HighlightedText tooltipContent='Версия' color='yellow'>
              {item.v}
            </HighlightedText>
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
