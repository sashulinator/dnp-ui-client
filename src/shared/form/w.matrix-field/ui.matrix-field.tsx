import { useMemo } from 'react'
import { useField } from 'react-final-form'

import Checkbox from '~/shared/checkbox'
import Labeled from '~/shared/labeled'
import { MatrixTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import { type Any, type Dictionary, c } from '~/utils/core'

export type Props<TItem extends Dictionary, TContext extends Dictionary, TValue> = Omit<
  MatrixTable.MatrixProps<TItem, TContext, TValue>,
  'onValuesChange' | 'values'
> & {
  name: string
  valueType: 'boolean' | 'string'
  serialize?: string
  deserialize?: string
  label?: string | undefined
}

const NAME = 'form-w-matrixField-MatrixField'

export default function Component<TItem extends Dictionary, TContext extends Dictionary, TValue>(
  props: Props<TItem, TContext, TValue>,
): JSX.Element {
  const { name, label, serialize = '', deserialize = '', columns, options } = props
  const field = useField(name, { subscription: { value: true } })

  const serializeFn = useMemo(() => (serialize ? new Function('context', serialize) : serializeDeserialize), [])
  const deserializeFn = useMemo(() => (deserialize ? new Function('context', deserialize) : serializeDeserialize), [])

  const values = useMemo(() => serializeFn({ values: field.input.value, walk, ...props }), [field.input.value])

  const renderCell = props.valueType === 'boolean' ? _renderBooleanCell : _renderTextCell

  return (
    <Labeled label={label}>
      <MatrixTable.default<Dictionary, Dictionary, unknown>
        className={c(props.className, NAME)}
        context={{}}
        columns={columns as Any}
        options={options as Any}
        values={values}
        renderCell={renderCell}
        onValuesChange={(values) => field.input.onChange(deserializeFn({ values, walk, ...props }))}
      />
    </Labeled>
  )

  /**
   * private
   */

  function serializeDeserialize<T>(context: { values: T }): T {
    return context.values
  }

  function walk(cb: (...args: unknown[]) => unknown) {
    for (let i = 0; i < columns.length; i++) {
      for (let j = 0; j < options.length; j++) {
        const columnType = columns[i].type
        const optionColumnTypes = options[j].columnTypes

        if (!optionColumnTypes) {
          cb(columns[i], options[j])
        } else if (optionColumnTypes && columnType && optionColumnTypes?.includes(columnType)) {
          cb(columns[i], options[j])
        }
      }
    }
  }
}

function _renderBooleanCell(props: MatrixTable.RenderCellProps<Any, Any, boolean>) {
  if (props.value === undefined) {
    return null
  }
  return (
    <Checkbox
      checked={Boolean(props.value)}
      onCheckedChange={(checked) => {
        props.onValueChange(!!checked)
      }}
    />
  )
}

function _renderTextCell(props: MatrixTable.RenderCellProps<Any, Any, string>) {
  return (
    <TextInput
      value={props.value}
      onChange={(event) => {
        props.onValueChange(event.target.value)
      }}
    />
  )
}

Component.displayName = NAME
