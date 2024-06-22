import { Tooltip } from '@radix-ui/themes'
import React from 'react'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import { Field } from '~/ui/form'
import { PlusIcon, TrashIcon } from '~/ui/icon'
import Text from '~/ui/text'
import Input from '~/ui/text-field'
import { c } from '~/utils/core'
import { remove, renameKey } from '~/utils/dictionary'

export interface Props {
  className?: string | undefined
  name: string
  label?: string | undefined
}

const displayName = 'ui-Form-w-KeyValue'

/**
 * ui-Form-w-KeyValue'
 */
function Component(props: Props): JSX.Element {
  return (
    <Field<Record<string, string>> name={props.name}>
      {({ input }) => {
        const entries = Object.entries(input.value)

        return (
          <Flex className={c(props.className, displayName)} direction='column' gap='1' width='100%'>
            {props.label && <Text size='2'>Опции</Text>}

            <Flex direction='column' gap='4'>
              {entries?.map(([key, value], index) => {
                return (
                  <Flex key={index} width='100%' gap='2' align='center'>
                    <Tooltip content='Ключ'>
                      <Input.Root
                        style={{ width: '100%' }}
                        placeholder='Ключ'
                        variant='soft'
                        value={key}
                        onChange={({ target }) => {
                          input.onChange(renameKey(input.value, key, target.value))
                        }}
                      />
                    </Tooltip>
                    <Tooltip content='Значение'>
                      <Input.Root
                        style={{ width: '100%' }}
                        placeholder='Значение'
                        variant='soft'
                        value={value}
                        onChange={({ target }) => {
                          input.onChange({ ...input.value, [key]: target.value })
                        }}
                      />
                    </Tooltip>
                    <Button
                      round={true}
                      size='1'
                      color='red'
                      onClick={() => {
                        input.onChange(remove(input.value, key))
                      }}
                    >
                      <TrashIcon />
                    </Button>
                  </Flex>
                )
              })}
              <Flex>
                <Button size='1' onClick={() => input.onChange({ ...input.value, '': '' })}>
                  <PlusIcon />
                  Добавить
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )
      }}
    </Field>
  )
}

const Memoed = React.memo(Component)
Memoed.displayName = displayName
export default Memoed
