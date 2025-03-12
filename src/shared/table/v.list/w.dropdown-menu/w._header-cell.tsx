import { createElement } from 'react'

import Button from '~/shared/button'
import { RenderCounter } from '~/shared/debug'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import { type Dictionary, assertDefined } from '~/utils/core'

import { type RenderHeaderProps } from '..'
import { type Context } from './type.contex'

export function HeaderCell<TItem extends Dictionary, TContext extends Context>({
  context,
  column,
}: RenderHeaderProps<TItem, TContext>): JSX.Element {
  assertDefined(context)
  return (
    <Flex justify='between' gap='4' align='center'>
      <RenderCounter style={{ transform: 'translateY(0)' }} />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button color={'gray'} square={true} size='1' variant='ghost'>
            <Icon name='DotsVertical' />
          </Button>
        </DropdownMenu.Trigger>
        {createElement(context.renderDropdownMenuContent, { column: column as any })}
      </DropdownMenu.Root>
    </Flex>
  )
}
