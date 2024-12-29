import s from './ui.calendar.module.scss'
import './ui.calendar.scss'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Flex, Theme } from '@radix-ui/themes'

import Calendar, { type CalendarProps } from 'react-calendar'

import { c } from '~/utils/core'

export interface Props extends CalendarProps {
  className?: string | undefined
}

const NAME = 'calendar-Calendar'

export default function Component(props: Props): JSX.Element {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button style={{ width: '100%' }} className={`rt-reset rt-SelectTrigger rt-r-size-2 rt-variant-surface`}>
          {String(props.value || '')}
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <Theme asChild>
          <DropdownMenuPrimitive.Content
            align='start'
            sideOffset={4}
            collisionPadding={10}
            asChild={false}
            className={c('rt-CalendarContent rt-PopperContent', 'rt-BaseMenuContent', 'rt-DropdownMenuContent')}
          >
            <Flex className={c('rt-BaseMenuViewport', 'rt-DropdownMenuViewport')} width='300px'>
              <Calendar
                tileClassName={c('rt-reset rt-BaseButton rt-r-size-2 rt-variant-soft rt-Button', s['tile'])}
                locale='ru-RU'
                {...props}
              />
            </Flex>
          </DropdownMenuPrimitive.Content>
        </Theme>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  )
}

Component.displayName = NAME
