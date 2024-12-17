import { useMemo } from 'react'
import { useField, useForm } from 'react-final-form'

import Flex from '~/shared/flex'
import { type Option } from '~/shared/select'
import { LabeledSelect } from '~/shared/select'
import { type Any, c, generateId } from '~/utils/core'
import { type Dictionary } from '~/utils/dictionary'

import { type Executable, type ExecutableModel } from '../models'
import { SLICE } from './constants'
import Factory from './w.ui.factory'

export interface Props {
  className?: string | undefined
  executableModels: ExecutableModel[]
  name: string
  columns: { name: string; display: string }[]
}

const NAME = `${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { name, executableModels, columns } = props

  const options = useMemo(executableOptions, [props.executableModels])

  const form = useForm()

  const nameField = useField<string>(`${name}.name`, { subscription: { value: true } })
  const paramsField = useField<Executable['params']>(`${name}.params`)

  const nameFieldValue = nameField.input.value

  const executableModel = useMemo(
    () => props.executableModels.find((m) => m.name === nameFieldValue),
    [props.executableModels, nameField.input.value],
  )

  return (
    <Flex className={c(props.className, NAME)} direction='column' gap='4'>
      <LabeledSelect.default
        options={options}
        label='Процедура'
        value={nameFieldValue}
        onChange={(event) => setInitialValuesOnNameChange(event.toString())}
      />
      <Factory executableModel={executableModel} name={name} columns={columns} />
    </Flex>
  )

  /**
   * private
   */

  function setInitialValuesOnNameChange(newName: string) {
    const model = executableModels.find((m) => m.name === newName) as ExecutableModel
    paramsField.input.onChange(getInitialParamsValues(model))
    nameField.input.onChange(newName)
  }

  function getInitialParamsValues(executableModel: ExecutableModel) {
    const initialParamsValue: Dictionary<Any> = {}

    for (let index = 0; index < executableModel?.params.length; index++) {
      const param = executableModel?.params[index]

      if (param.getInitialValue) {
        initialParamsValue[param.name] = new Function('context', param.getInitialValue)({
          ...props,
          thisParam: param,
          formState: form.getState(),
          generateId,
        }) as Any
      }
    }

    return initialParamsValue
  }

  function executableOptions(): Option[] {
    return executableModels.map((m) => ({ value: m.name, display: m.display }))
  }
}

Component.displayName = NAME
