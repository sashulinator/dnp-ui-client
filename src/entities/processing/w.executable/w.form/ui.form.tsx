import { type ReactNode, createElement, useMemo } from 'react'
import { Field } from 'react-final-form'

import Flex from '~/shared/flex'
import { MatrixField, TypedIntegerField, TypedStringField, useField } from '~/shared/form'
import { type Option } from '~/shared/select'
import { LabeledSelect } from '~/shared/select'
import { type Any, c } from '~/utils/core'
import { type Dictionary } from '~/utils/dictionary'

import { type ExecutableModel } from '../models'
import { SLICE } from './constants'

export interface Props {
  className?: string | undefined
  executableModels: ExecutableModel[]
  name: string
  columns: { name: string; display: string }[]
}

const NAME = `${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { name, executableModels, columns } = props

  const options = useMemo(executableModelsToOptions, [props.executableModels])

  return (
    <Flex className={c(props.className, NAME)} direction='column' gap='4'>
      <Field<{ name: string; params: Record<string, unknown> }> name={name}>
        {({ input }) => {
          return (
            <LabeledSelect.default
              options={options}
              label='Процедура'
              value={input.value.name}
              onChange={(value) => {
                const params: Dictionary<Any> = {}
                const model = executableModels.find((m) => m.name === value) as ExecutableModel
                for (let index = 0; index < model?.params.length; index++) {
                  const param = model?.params[index]
                  if (param.getInitialValue) {
                    params[param.name] = new Function('context', param.getInitialValue)({
                      ...props,
                      thisParam: param,
                    }) as Any
                  }
                }
                input.onChange({ name: value, params })
              }}
            />
          )
        }}
      </Field>
      <Factory executableModels={executableModels} name={name} columns={columns} />
    </Flex>
  )

  /**
   * private
   */

  function executableModelsToOptions(): Option[] {
    return executableModels.map((m) => ({ value: m.name, display: m.display }))
  }
}

Component.displayName = NAME

type _FactoryProps = {
  executableModels: ExecutableModel[]
  columns: { name: string; display: string }[]
  name: string
}

function Factory(props: _FactoryProps): ReactNode {
  const { name, columns } = props

  const field = useField(`${name}.name`, { subscription: { value: true } })

  const executable = useMemo(
    () => props.executableModels.find((m) => m.name === field.input.value),
    [props.executableModels, field.input.value],
  )

  return (
    executable?.params.map((p, i) => {
      const component =
        p.component.name === 'Number'
          ? TypedIntegerField
          : p.component.name === 'Matrix'
            ? MatrixField
            : TypedStringField
      return createElement(component as Any, {
        key: i,
        name: `${name}.params.${p.name}`,
        label: p.display,
        columns,
        ...p.component.props,
      })
    }) ?? null
  )
}
