import { useEffect, useState } from 'react'

import { COMPARISON, IS, MATCH } from '~dnp/common/shared/where'
import Select, { type SelectTriggerProps } from '~dnp/shared/select'
import TextField, { type RootProps } from '~dnp/shared/text-field'
import { useDebounceCallback } from '~dnp/utils/core-hooks'
import { fns } from '~dnp/utils/function'

import { useContext } from '../model/context'

/**
 * where-FilterConfigurator-c-Input
 */

const NAME = 'where-FilterConfigurator-c-Input'

type Props = _TextInputProps | _TemplateInputProps

export function Input(props: Props) {
  const { ...inputProps } = props
  const { filterConfig } = useContext()

  if (isTextMode()) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <_TextInput {...(inputProps as any)} />
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

type _TextInputProps = RootProps

function _TextInput(props: _TextInputProps) {
  const { ...textInputProps } = props

  const { filterConfig, onFilterConfigChange } = useContext()

  const [onFilterConfigChangeWithDebounce] = useDebounceCallback(onFilterConfigChange, 500)
  const [value, setValue] = useState('')

  useEffect(() => setValue(filterConfig.value || ''), [filterConfig.value])

  return (
    <TextField.Root
      size='1'
      color='amber'
      variant={value ? 'soft' : 'borderless'}
      {...textInputProps}
      value={value || ''}
      onChange={fns(textInputProps.onChange, (e) => {
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

type _TemplateInputProps = SelectTriggerProps

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
