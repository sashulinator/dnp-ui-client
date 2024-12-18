import { useMemo } from 'react'
import { useField } from 'react-final-form'

import { type Option } from '~/shared/select'
import { LabeledSelect } from '~/shared/select'

import { type ExecutableDesign } from '../models'
import { SLICE } from './constants'

export interface Props {
  executableDesigns: ExecutableDesign[]
  name: string
  onNameChange: (value: string) => void
}

const NAME = `${SLICE}-Form`

/**
 * - Меняет процедуру
 * - Устанавливает InitialValues для выбранной процедуры
 */
export default function Component(props: Props): JSX.Element {
  const { name, executableDesigns } = props

  const options = useMemo(executableOptions, [props.executableDesigns])

  const nameField = useField<string>(`${name}.name`, { subscription: { value: true } })

  const nameFieldValue = nameField.input.value

  return (
    <LabeledSelect.default
      options={options}
      label='Процедура'
      value={nameFieldValue}
      onChange={(event) => {
        const value = event.toString()
        nameField.input.onChange(value)
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
