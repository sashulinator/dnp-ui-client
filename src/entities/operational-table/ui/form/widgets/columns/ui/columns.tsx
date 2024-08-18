import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import { DataList } from '@radix-ui/themes'
import { getIn } from 'final-form'
import React, { useState } from 'react'
import { FieldArray } from 'react-final-form-arrays'
import Button from '~/ui/button'
import Card from '~/ui/card'
import Flex from '~/ui/flex'
import { Field, Label, Select, TextField, useForm } from '~/ui/form'
import Separator from '~/ui/separator'
import Text from '~/ui/text'
import { c, generateUniqId, isDev } from '~/utils/core'

type Item = {
  id: string
  key: string
  name: string
  type: string
  relation?: {
    table: string
    key: string
  }
}

export interface Props {
  className?: string | undefined
  name: string
}

export const NAME = 'operationalTable-Form-w-Columns'

const FLEX_BASIS = 'calc(25% - 6px)'

/**
 * operationalTable-Form-w-Columns'
 */
export default function Component(props: Props): JSX.Element {
  const { name } = props

  return (
    <Flex width='100%' wrap='wrap' gap='2'>
      <FieldArray<Item> name={name} className={c(props.className, NAME)}>
        {({ fields }) => {
          return (
            <>
              {fields.map((name, index) =>
                React.createElement(_renderColumn, {
                  key: name,
                  name,
                  index,
                  move: fields.move,
                  remove: fields.remove,
                  length: fields.length || 0,
                }),
              )}
              <Button
                type='button'
                onClick={() =>
                  fields.push({
                    id: generateUniqId(3, (id) => !fields.value.find((item) => item.id === id)),
                    key: '',
                    name: '',
                    type: 'string',
                  })
                }
                variant='outline'
                asChild
                style={{
                  display: 'flex',
                  height: '14.5rem',
                  order: fields.length,
                  flexBasis: FLEX_BASIS,
                }}
              >
                <Flex align='center' justify='center'>
                  <PlusIcon style={{ scale: '3' }} />
                </Flex>
              </Button>
            </>
          )
        }}
      </FieldArray>
    </Flex>
  )
}

Component.displayName = NAME

interface _renderColumnProps {
  name: string
  index: number
  remove: (index: number) => void
  move: (from: number, to: number) => void
  length: number
}

function _renderColumn(props: _renderColumnProps) {
  const { name, index, move, remove, length } = props
  const form = useForm()
  const value = getIn(form.getState().values, `${name}.relation`)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hasRelation, setHasRelation] = useState(Boolean(value))

  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexBasis: FLEX_BASIS,
        order: index,
        transition: 'flex 0.3s',
      }}
    >
      <Flex direction='column' gap='4'>
        <Flex gap='2' width='100%' justify='end' align='center'>
          {isDev() && (
            <Field name={`${name}.id`}>
              {({ input }) => {
                return (
                  <Text color='gray' size='1'>
                    {input.value}
                  </Text>
                )
              }}
            </Field>
          )}
          <Button disabled={index === 0} onClick={() => move(index, index - 1)} size='1' variant='outline' round={true}>
            <ArrowLeftIcon />
          </Button>
          <Text color='gray' size='1'>
            {index}
          </Text>
          <Button
            disabled={index === (length || 0) - 1}
            onClick={() => move(index, index + 1)}
            size='1'
            variant='outline'
            round={true}
          >
            <ArrowRightIcon />
          </Button>
          <Separator orientation='vertical' />
          <Button onClick={() => remove(index)} variant='outline' color='red' round={true}>
            <TrashIcon />
          </Button>
        </Flex>
        <DataList.Root size='2'>
          <DataList.Item>
            <Label content='Ключ' />
            <DataList.Value>
              <TextField size='1' variant='soft' name={`${name}.key`} />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <Label content='Название' />
            <DataList.Value>
              <TextField size='1' variant='soft' name={`${name}.name`} />
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <Label content='Тип' />
            <DataList.Value>
              <Select
                size='1'
                name={`${name}.type`}
                defaultValue='string'
                options={[
                  { value: 'string', display: 'Строка' },
                  { value: 'number', display: 'Число' },
                  { value: 'float', display: 'Нецелочисленное' },
                  { value: 'date', display: 'Дата' },
                  { value: 'boolean', display: 'Да/Heт' },
                ]}
              />
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <Card>
          <DataList.Root size='2'>
            <DataList.Item>
              <Text size='1' color='gray'>
                Связь
              </Text>
              <DataList.Value>
                <Flex width='100%' justify='end'>
                  <Button
                    onClick={() => setHasRelation(!hasRelation)}
                    size='1'
                    variant='outline'
                    round={true}
                    type='button'
                  >
                    {hasRelation ? <ChevronUpIcon /> : <ChevronDownIcon />}
                  </Button>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            {hasRelation && (
              <>
                <DataList.Item>
                  <Label content='Таблица' />
                  <DataList.Value>
                    <TextField size='1' variant='soft' name={`${name}.relation.table`} />
                  </DataList.Value>
                </DataList.Item>
                <DataList.Item>
                  <Label content='Ключ' />
                  <DataList.Value>
                    <TextField size='1' variant='soft' name={`${name}.relation.key`} />
                  </DataList.Value>
                </DataList.Item>
              </>
            )}
          </DataList.Root>
        </Card>
      </Flex>
    </Card>
  )
}
