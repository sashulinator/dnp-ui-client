import Button from '~/shared/button'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import TextInput from '~/shared/text-input'
import { type Dictionary, assertDefined } from '~/utils/core'
import { useSubscribeUpdate } from '~/utils/core-hooks'

import { type RenderHeaderProps } from '..'
import { EMPTY, generateEmptyValue, isEmptyValue } from './lib.generate-empty-value'
import { type Context } from './models.contex'

export function HeaderCell<TItem extends Dictionary, TContext extends Context<TItem>>({
  name,
  context,
}: RenderHeaderProps<TItem, TContext>): JSX.Element {
  assertDefined(context)

  const columnNameAtom = context.columnNameAtoms[name]
  useSubscribeUpdate(columnNameAtom.subscribe)

  const atomValue = columnNameAtom.get()

  return (
    <Flex width='100%' gap='1' align='center'>
      <TextInput
        style={{ width: '100%' }}
        value={atomValue.includes(EMPTY) ? '' : atomValue}
        onChange={(event) => {
          const value = event.target.value
          let newValue: string
          if (isEmptyValue(value)) {
            newValue = value.replace(atomValue, '')
          } else {
            newValue = !value ? generateEmptyValue() : value
          }
          columnNameAtom.set(newValue)
        }}
      />
      <Button round={true} variant='soft' onClick={() => context.removeColumn(name)}>
        <Icon name='Trash' />
      </Button>
    </Flex>
  )
}
