import { useEffect, useState } from 'react'

import { COMPARISON, IS, MATCH } from '~/common/slices/where'
import type { NumberInputProps } from '~/shared/number-input'
import NumberInput from '~/shared/number-input'
import Select from '~/shared/select'
import type { TextInputProps } from '~/shared/text-input'
import TextInput from '~/shared/text-input'
import { useDebounceCallback } from '~/utils/core-hooks'
import { fns } from '~/utils/function'

import { useContext } from '../model/context'

/**
 * where-FilterConfigurator-c-Input
 */

const NAME = 'where-FilterConfigurator-c-Input'

type Props = _InputProps | _TemplateInputProps

export function Input(props: Props) {
  const { ...inputProps } = props
  const { filterConfig } = useContext()

  if (isTextMode()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <_Input {...(inputProps as any)} />
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <_TemplateInput {...(inputProps as any)} />
  }

  /**
   * Private
   */

  function isTextMode() {
    const textTypes = [...Object.keys(MATCH), ...Object.keys(COMPARISON)]
    return textTypes.includes(filterConfig.type)
  }
}

Input.displayName = NAME

/**
 * _TextInputProps
 */

type _InputProps = TextInputProps | NumberInputProps

function _Input(props: _InputProps) {
  const { ...textInputProps } = props

  const { filterConfig, onFilterConfigChange } = useContext()

  const [onFilterConfigChangeWithDebounce] = useDebounceCallback(onFilterConfigChange, 500)
  const [value, setValue] = useState('')

  useEffect(() => setValue(filterConfig.value || ''), [filterConfig.value])

  const UiInput = textInputProps.type === 'number' ? NumberInput : TextInput

  return (
    <UiInput
      size='1'
      color='amber'
      variant={value ? 'soft' : 'surface'}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(textInputProps as any)}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value={(value || '') as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={fns(textInputProps.onChange as any, (e) => {
        const value = e.target.value
        setValue(value)
        onFilterConfigChangeWithDebounce({ ...filterConfig, value: value === '' ? null : value })
      })}
    />
  )
}

/**
 * _TemplateInput
 */

type _TemplateInputProps = Select.TriggerProps

function _TemplateInput(props: _TemplateInputProps) {
  const { ...textInputProps } = props

  const { filterConfig, onFilterConfigChange } = useContext()

  const isEmpty = filterConfig.type === IS.is && filterConfig.value === null

  return (
    <Select.Root
      size='1'
      value={isEmpty ? 'empty' : 'notEmpty'}
      onValueChange={(value) => {
        onFilterConfigChange({ value: null, type: value === 'empty' ? IS.is : IS.not })
      }}
    >
      <Select.Trigger {...textInputProps} />
      <Select.Content>
        <Select.Group>
          <Select.Item value='empty'>Пусто</Select.Item>
          <Select.Item value='notEmpty'>Не пусто</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}
