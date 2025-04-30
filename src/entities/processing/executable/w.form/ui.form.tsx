import { useMemo } from 'react'
import { useField } from 'react-final-form'

import { type Option } from '~/shared/select'
import { LabeledSelect } from '~/shared/select'

import { type Procedure } from '../models'
import { SLICE } from './constants'

export interface Props {
  executableSchemas: Procedure[]
  name: string
  onNameChange: (value: string) => void
  readonly?: boolean
}

const NAME = `${SLICE}-Form`

/**
 * - Меняет процедуру
 * - Устанавливает InitialValues для выбранной процедуры
 */
export default function Component(props: Props): JSX.Element {
  const { name, executableSchemas, onNameChange, readonly } = props

  const options = useMemo(executableOptions, [props.executableSchemas])

  const nameField = useField<string>(`${name}.name`, { subscription: { value: true } })

  const nameFieldValue = nameField.input.value

  return (
    <LabeledSelect.default
      options={options}
      label='Название'
      style={{ pointerEvents: readonly ? 'none' : undefined }}
      value={nameFieldValue}
      disabled={readonly}
      onChange={(event) => {
        const value = event.toString()
        nameField.input.onChange(value)
        onNameChange(value)
      }}
    />
  )

  /**
   * private
   */

  function executableOptions(): Option[] {
    return executableSchemas.map((m) => ({ value: m.name, display: m.display }))
  }
}

Component.displayName = NAME
