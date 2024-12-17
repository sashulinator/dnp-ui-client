import { useMemo } from 'react'
import { useField } from 'react-final-form'

import { type Option } from '~/shared/select'
import { LabeledSelect } from '~/shared/select'

import { type GetParamsInitialValuesParams, getParamsInitialValues } from '../lib.get-params-initial-values'
import { type Executable, type ExecutableDesign } from '../models'
import { SLICE } from './constants'

export interface Props {
  executableDesigns: ExecutableDesign[]
  name: string
  context: GetParamsInitialValuesParams['context']
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
  const paramsField = useField<Executable['params']>(`${name}.params`)

  const nameFieldValue = nameField.input.value

  return (
    <LabeledSelect.default
      options={options}
      label='Процедура'
      value={nameFieldValue}
      onChange={(event) => setValuesOnNameChange(event.toString())}
    />
  )

  /**
   * private
   */

  function setValuesOnNameChange(newName: string) {
    const model = executableDesigns.find((m) => m.name === newName) as ExecutableDesign
    const paramInitialValues = getParamsInitialValues({
      executableDesign: model,
      context: props.context,
    })

    paramsField.input.onChange(paramInitialValues)
    nameField.input.onChange(newName)
  }

  function executableOptions(): Option[] {
    return executableDesigns.map((m) => ({ value: m.name, display: m.display }))
  }
}

Component.displayName = NAME
