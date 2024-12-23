import { type ReactNode, createElement, useMemo } from 'react'

import { useField } from '~/shared/form'
import Text from '~/shared/text'
import { type Any } from '~/utils/core'

import { SLICE } from '../constants'
import { type ComponentSchema, type ExecutableSchema, type ParamSchema } from '../models'
import { type ParamFactoryContext } from './models'
import StringField from './ui.string-field'
import FackerColConfig from './w.facker-col-config'
import MatrixField from './w.matrix-field'

const componentMap = {
  string: StringField,
  Matrix: MatrixField,
  FackerColConfig: FackerColConfig,
}

export interface Props {
  executableSchemas: ExecutableSchema[] | undefined
  columns: { name: string; display: string; type: string }[]
  name: string
  isSingleMode: boolean
  setMultyValue: (value: unknown, name: string) => void
}
const NAME = `${SLICE}-FieldFactory`

export default function Component(props: Props): ReactNode {
  const { executableSchemas } = props

  const nameField = useField<string>(`${props.name}.name`, { subscription: { value: true } })

  const executableSchemaName = nameField.input.value

  const executableSchema = useMemo(() => {
    return executableSchemas?.find((executableSchema) => executableSchema.name === executableSchemaName)
  }, [executableSchemaName, executableSchemas])

  if (!executableSchema) {
    return <Text color='red'>Такой процедуры не существует</Text>
  }

  return (
    executableSchema?.params?.map((paramSchema, i) => {
      if (!paramSchema.component) return null
      return (
        <ComponentWrapper
          key={i}
          executableSchema={executableSchema}
          columns={props.columns}
          name={props.name}
          isSingleMode={props.isSingleMode}
          setMultyValue={props.setMultyValue}
          paramSchema={paramSchema}
        />
      )
    }) ?? null
  )
}

type ComponentWrapperProps = {
  executableSchema: ExecutableSchema
  columns: { name: string; display: string; type: string }[]
  name: string
  paramSchema: ParamSchema
  isSingleMode: boolean
  setMultyValue: (value: unknown, name: string) => void
}

function ComponentWrapper(props: ComponentWrapperProps) {
  const { isSingleMode, paramSchema, columns, name, setMultyValue } = props
  const componentDesign = paramSchema.component as ComponentSchema
  const { serialize = '', deserialize = '' } = componentDesign as ComponentSchema

  const component = componentMap?.[componentDesign.name as 'Matrix'] || StringField
  const modeProps = isSingleMode ? componentDesign.singleModeProps : componentDesign.multiModeProps

  const _paramContext: ParamFactoryContext = {
    name: `${name}.params.${paramSchema.name}`,
    columns,
    paramSchema,
    isSingleMode,
  }

  const field = useField(`${name}.params.${paramSchema.name}`, { subscription: { value: true } })

  const serializeFn = useMemo(() => (serialize ? new Function('context', serialize) : serializeDeserialize), [])
  const deserializeFn = useMemo(() => (deserialize ? new Function('context', deserialize) : serializeDeserialize), [])

  const value = useMemo(() => serializeFn({ value: field.input.value, ...props }), [field.input.value])

  return createElement(component as Any, {
    ...componentDesign.props,
    ...modeProps,
    readOnly: isSingleMode && !paramSchema.unique,
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
