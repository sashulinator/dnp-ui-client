import './item.scss'

import dayjs from 'dayjs'

import { routes } from '~dnp/app/route'
import Card from '~dnp/shared/card'
import Flex from '~dnp/shared/flex'
import Link from '~dnp/shared/link'
import Text, { HighlightedText } from '~dnp/shared/text'
import Tooltip from '~dnp/shared/tooltip'
import { c } from '~dnp/utils/core'

import type { Process } from '../../../types/process'
import { ProcessStatusBadge } from '../../ProcessStatusBadge'
import { ProcessTypeBadge } from '../../ProcessTypeBadge'

export interface Props {
  className?: string | undefined
  item: Process
  number: number
}

const displayName = 'dnp-process-Item'

/**
 * dnp-process-Item
 */
export default function Component(props: Props): JSX.Element {
  const { className, item, number } = props

  return (
    <Card key={item.id} asChild={true} className={c(displayName, className)}>
      <Link to={`${routes.processes_kn.getUrl(item.id)}`}>
        <Flex gap='28px' align='stretch'>
          <Flex width='50px' pl='8px' pr='24px' align='center'>
            <Text color='gray' as='div'>
              {number}
            </Text>
          </Flex>
          <Flex width='300px' direction='column' justify='between' align='start' gap='2'>
            <Text color='gray' size='1'>
              Таблица
            </Text>
            <HighlightedText tooltipContent='Техническое название таблицы'>{item.tableId}</HighlightedText>
          </Flex>
        </Flex>
        <Flex align='start' gap='36px' pr='8px'>
          <Flex width='100px' direction='column' justify='between' align='start' gap='2'>
            <Text color='gray' size='1'>
              Тип процесса
            </Text>
            <ProcessTypeBadge type={item.type} />
          </Flex>
          <Flex width='100px' direction='column' justify='between' align='start' gap='2'>
            <Text color='gray' size='1'>
              Статус
            </Text>
            <ProcessStatusBadge status='STARTED' />
          </Flex>
          <Flex direction='column' justify='between' align='start' gap='3'>
            <Text color='gray' size='1'>
              Запущен
            </Text>
            <Tooltip content='Создано'>
              <Text color='gray' as='div' size='1'>
                {dayjs(item?.createdAt).format('DD.MM.YYYY HH:mm')}
              </Text>
            </Tooltip>
          </Flex>
        </Flex>
      </Link>
    </Card>
  )
}

Component.displayName = displayName
