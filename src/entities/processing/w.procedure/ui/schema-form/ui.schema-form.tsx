import { createElement, useMemo } from 'react'

import { APP } from '~/app/constants.app'
import Button from '~/shared/button'
import Card from '~/shared/card'
import Flex from '~/shared/flex'
import { Field, TextField as FormTextField, Label, Select, TypedField, useField } from '~/shared/form'
import Icon from '~/shared/icon'
import TagPicker from '~/shared/tag-picker'
import Text from '~/shared/text'
import TextField from '~/shared/text-field'
import { c } from '~/utils/core'
import { remove, renameKey } from '~/utils/dictionary'

import { type Procedure } from '../..'
import { SLICE } from '../../../constants'

export interface Props {
  className?: string | undefined
  procedures: Procedure[]
  name: string
}

const NAME = `${APP}-${SLICE}-SchemaForm`

export default function Component(props: Props): JSX.Element {
  const { className, name, procedures } = props

  const options = useMemo(() => procedures.map((p) => ({ value: p.name, display: p.display })), [])

  return (
    <Flex asChild={true} width='100%'>
      <Card className={c(NAME, className)}>
        <TypedField label='Процедура' component={Select} options={options} name={`${name}.name`} />
        <Flex direction='column' mt='4' width='100%'>
          <Text size='1' color='gray'>
            Параметры
          </Text>
          <_Schema name={name} procedures={procedures} />
        </Flex>
      </Card>
    </Flex>
  )
}

Component.displayName = NAME

interface _SchemaProps {
  name: string
  procedures: Procedure[]
}

function _Schema(props: _SchemaProps) {
  const { name, procedures } = props

  const field = useField<{ name: string }>(name, { subscription: { value: true } })

  const procedure = procedures?.find((p) => p.name === field.input.value.name)

  if (procedure === undefined) {
    if (field.input.value) {
      return <Text color='red'>Неизвестная процедура</Text>
    }
    return null
  }

  return (
    <Flex direction='column' width='100%' gap='4'>
      {procedure.params.map((param) => {
        if (param.isIterableTableName) return null

        if (param.component?.name === 'keyValue') {
          return (
            <Field type='object' key={param.name} name={`${name}.params.${param.name}`}>
              {({ input }) => {
                return (
                  <Flex direction='column' width='100%'>
                    <Label children={param.display} />
                    <_KeyValue<string[] | undefined>
                      value={input.value as any}
                      onValueChange={input.onChange}
                      getDefaultValue={() => []}
                      renderValue={({ value, onChange }) => {
                        return <TagPicker value={value} onChange={onChange} />
                      }}
                    />
                  </Flex>
                )
              }}
            </Field>
          )
        }

        return (
          <Flex key={param.name} width='100%'>
            <Field label={param.display} component={FormTextField} name={`${name}.params.${param.name}`} />
          </Flex>
        )
      })}
    </Flex>
  )
}

const __EMPTY__ = '__EMPTY__'

type _KeyValueProps<T> = {
  value: Record<string, T> | undefined
  onValueChange: (value: Record<string, T>) => void
  renderValue: (props: { value: T; onChange: (value: T) => void }) => React.ReactNode
  getDefaultValue: () => T
}

function _KeyValue<T>(props: _KeyValueProps<T>) {
  const { value: propsValue, onValueChange, getDefaultValue } = props

  const value = propsValue || { __EMPTY__: getDefaultValue() }

  const entries = Object.entries(value)

  return (
    <Flex direction='column' width='100%' gap='4'>
      {entries.map(([key, objValue], index) => {
        return (
          <Flex key={index} width='100%' gap='2'>
            <Button variant='soft' round={true} onClick={() => onValueChange(remove(value || {}, key))}>
              <Icon name='Trash' />
            </Button>
            <TextField.Root
              variant='soft'
              color={key === __EMPTY__ ? 'red' : undefined}
              value={key === __EMPTY__ ? '' : key}
              onChange={(e) => {
                const newValue = e.target.value === '' ? __EMPTY__ : e.target.value
                // @ts-ignore
                onValueChange(renameKey(value, key, newValue))
              }}
            />
            <Flex align='center' justify='center' width='12px'>
              {':'}
            </Flex>
            {createElement(props.renderValue, {
              value: objValue,
              onChange: (objValue) => onValueChange({ ...value, [key]: objValue }),
            })}
          </Flex>
        )
      })}
      <Flex>
        <Button
          size='1'
          onClick={() => {
            // @ts-ignore
            onValueChange({ ...value, [__EMPTY__]: getDefaultValue() })
          }}
        >
          Добавить
        </Button>
      </Flex>
    </Flex>
  )
}
