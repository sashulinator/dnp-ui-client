import { type ReactNode, createElement, useMemo } from 'react'

import { TypedIntegerField, TypedStringField, TypedUnionField, useField } from '~/shared/form'
import { type Option } from '~/shared/select'
import { type Any, c } from '~/utils/core'

import { type ExecutableModel } from '../models'
import { SLICE } from './constants'

export interface Props {
  className?: string | undefined
  executableModels: ExecutableModel[]
  name?: string | undefined
}

const NAME = `${SLICE}-Form`

export default function Component(props: Props): JSX.Element {
  const { name: nameProp, executableModels } = props

  const name = (nameProp ? `${nameProp}.` : '') as ''

  const options = useMemo(executableModelsToOptions, [props.executableModels])

  return (
    <div className={c(props.className, NAME)}>
      <TypedUnionField testValueType={TypedUnionField.testValueType} options={options} name={`${name}name`} />
      <Factory executableModels={executableModels} name={name} />
    </div>
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
  name: string
}

function Factory(props: _FactoryProps): ReactNode {
  const { name: nameProp } = props
  const name = (nameProp ? `${nameProp}.` : '') as ''

  const field = useField(`${name}name`, { subscription: { value: true } })

  const executable = useMemo(
    () => props.executableModels.find((m) => m.name === field.input.value),
    [props.executableModels, props.name],
  )

  return (
    executable?.params.map((p, i) => {
      const component = p.component.name === 'number' ? TypedIntegerField : TypedStringField
      return createElement(component as Any, {
        key: i,
        name: `${name}params[${i}].${p.name}`,
        label: p.display,
      })
    }) ?? null
  )
}
