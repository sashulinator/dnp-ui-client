import './item.scss'

import dayjs from 'dayjs'

import Avatar from '~/shared/avatar'
import Badge from '~/shared/badge'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import Separator from '~/shared/separator'
import Text from '~/shared/text'
import TextHighlighter from '~/shared/text-highlighter'
import Tooltip from '~/shared/tooltip'
import { c } from '~/utils/core'

import { Process } from '../../../types/process'

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
      <Flex>
        <TextHighlighter tooltipContent='Название конфига нормализации'>
          {item.normalizationConfig.name}
        </TextHighlighter>
      </Flex>
      <Flex gap='4' align='center'>
        <Flex align='center' gap='2'>
          {item.normalizationConfig.last ? <Badge color='green'>Текущий</Badge> : <Badge color='red'>Архивный</Badge>}
          <TextHighlighter color='yellow' tooltipContent='Версия конфига нормализации'>
            {item.normalizationConfig.v}
          </TextHighlighter>
        </Flex>
        <Separator orientation='vertical' />
        <Flex gap='2' align='center'>
          <Tooltip content={item.createdBy.name}>
            <Avatar radius='full' size='1' fallback='a' src={item.createdBy.avatar} />
          </Tooltip>
          <Tooltip content='Создано'>
            <Text color='gray' as='div' size='1'>
              {dayjs(item?.createdAt).format('DD.MM.YYYY HH:mm')}
            </Text>
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  )
}

Component.displayName = displayName
