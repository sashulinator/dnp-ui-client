import { type ReactNode, createElement, useMemo } from 'react'

import { useField } from '~/shared/form'
import Text from '~/shared/text'
import { type Any } from '~/utils/core'

import { SLICE } from '../constants'
import { type ExecutableDesign, ParamComponentDesign, type ParamDesign } from '../models'
import { type ParamFactoryContext } from './models'
import StringField from './ui.string-field'
import MatrixField from './w.matrix-field'

const componentMap = {
  string: StringField,
  Matrix: MatrixField,
}

export interface Props {
  executableDesigns: ExecutableDesign[] | undefined
  columns: { name: string; display: string; type: string }[]
  name: string
  isSingleMode: boolean
  setMultyValue: (value: unknown, name: string) => void
}
const NAME = `${SLICE}-FieldFactory`

export default function Component(props: Props): ReactNode {
  const { executableDesigns } = props

  const nameField = useField<string>(`${props.name}.name`, { subscription: { value: true } })

  const executableDesignName = nameField.input.value

  const executableDesign = useMemo(() => {
    return executableDesigns?.find((executableDesign) => executableDesign.name === executableDesignName)
  }, [executableDesignName, executableDesigns])

  if (!executableDesign) {
    return <Text color='red'>Такой процедуры не существует</Text>
  }

  return (
    executableDesign?.params?.map((paramDesign, i) => {
      if (!paramDesign.component) return null
      return (
        <ComponentWrapper
          key={i}
          executableDesign={executableDesign}
          columns={props.columns}
          name={props.name}
          isSingleMode={props.isSingleMode}
          setMultyValue={props.setMultyValue}
          paramDesign={paramDesign}
        />
      )
    }) ?? null
  )
}

type ComponentWrapperProps = {
  executableDesign: ExecutableDesign
  columns: { name: string; display: string; type: string }[]
  name: string
  paramDesign: ParamDesign
  isSingleMode: boolean
  setMultyValue: (value: unknown, name: string) => void
}

function ComponentWrapper(props: ComponentWrapperProps) {
  const { isSingleMode, paramDesign, columns, name, setMultyValue } = props
  const componentDesign = paramDesign.component as ParamComponentDesign
  const { serialize = '', deserialize = '' } = componentDesign as ParamComponentDesign

  const component = componentMap?.[componentDesign.name as 'Matrix'] || StringField
  const modeProps = isSingleMode ? componentDesign.singleModeProps : componentDesign.multiModeProps

  const _paramContext: ParamFactoryContext = {
    name: `${name}.params.${paramDesign.name}`,
    columns,
    paramDesign,
    isSingleMode,
  }

  const field = useField(`${name}.params.${paramDesign.name}`, { subscription: { value: true } })

  const serializeFn = useMemo(() => (serialize ? new Function('context', serialize) : serializeDeserialize), [])
  const deserializeFn = useMemo(() => (deserialize ? new Function('context', deserialize) : serializeDeserialize), [])

  const value = useMemo(() => serializeFn({ value: field.input.value, ...props }), [field.input.value])

  return createElement(component as Any, {
    ...componentDesign.props,
    ...modeProps,
    readOnly: isSingleMode && !paramDesign.unique,
    _paramContext,
    value,
    onChange: (value: unknown) => {
      if (isSingleMode) {
        field.input.onChange(deserializeFn({ value, ...props }))
      } else {
        setMultyValue(deserializeFn({ value, ...props }), _paramContext.name)
      }
    },
  })

  function serializeDeserialize<T>(context: { value: T }): T {
    return context.value
  }
}

Component.displayName = NAME
