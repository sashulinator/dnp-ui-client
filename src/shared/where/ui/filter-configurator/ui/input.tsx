import { useState } from 'react'

import TextField, { type RootProps } from '~/shared/text-field'
import { useDebounceCallback } from '~/utils/core-hooks'
import { fns } from '~/utils/function'

import { useContext } from '../model/context'

const NAME = 'where-FilterConfigurator-c-Input'

type Props = RootProps

/**
 * where-FilterConfigurator-c-Input
 */
export function Input(props: Props) {
  const { ...textInputProps } = props
  const { filterConfig, onFilterConfigChange } = useContext()

  const [onFilterConfigChangeWithDebounce] = useDebounceCallback(onFilterConfigChange, 500)
  const [value, setValue] = useState(filterConfig.value || '')

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

Input.displayName = NAME
