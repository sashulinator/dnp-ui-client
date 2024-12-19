import { useMemo } from 'react'
import { useField } from 'react-final-form'

import { type Option } from '~/shared/select'
import { LabeledSelect } from '~/shared/select'
import { LabeledTextInput } from '~/shared/text-input'

import { type ExecutableDesign } from '../models'
import { SLICE } from './constants'

export interface Props {
  executableDesigns: ExecutableDesign[]
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
  const { name, executableDesigns, onNameChange, readonly } = props

  const options = useMemo(executableOptions, [props.executableDesigns])

  const nameField = useField<string>(`${name}.name`, { subscription: { value: true } })

  const nameFieldValue = nameField.input.value

  if (readonly) {
    return (
      <LabeledTextInput
        label='Название'
        readOnly={readonly}
        value={nameFieldValue}
        onChange={(event) => {
          const value = event.toString()
          nameField.input.onChange(value)
          onNameChange(value)
        }}
      />
    )
  }

  return (
    <LabeledSelect.default
      options={options}
      label='Название'
      value={nameFieldValue}
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
    return executableDesigns.map((m) => ({ value: m.name, display: m.display }))
  }
}

Component.displayName = NAME
