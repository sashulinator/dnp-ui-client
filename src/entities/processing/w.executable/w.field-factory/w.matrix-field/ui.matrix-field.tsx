import { ScrollArea } from '@radix-ui/themes'

import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import Labeled from '~/shared/labeled'
import OptionFilter from '~/shared/select/w.option-filter'
import { MatrixTable } from '~/shared/table'
import TextInput from '~/shared/text-input'
import { type Any, type Dictionary, c } from '~/utils/core'

import { type ParamFactoryContext } from '../models'

export type Props<TItem extends Dictionary, TContext extends Dictionary, TValue> = Omit<
  MatrixTable.MatrixProps<TItem, TContext, TValue>,
  'onValuesChange' | 'values' | 'columns'
> & {
  valueType: 'boolean' | 'string'
  value: Record<string, TValue>
  onChange: (value: Record<string, TValue>) => void
  _paramContext: ParamFactoryContext
}

const NAME = 'form-w-matrixField-MatrixField'

export default function Component<TItem extends Dictionary, TContext extends Dictionary, TValue>(
  props: Props<TItem, TContext, TValue>,
): JSX.Element | string {
  const { value, _paramContext, options, onChange } = props
  const { columns, isSingleMode } = _paramContext
  if (!isSingleMode) return 'Для настройки метрик перейдите во вкладку "Потабличная настройка"'
  const renderCell = props.valueType === 'boolean' ? _renderBooleanCell : _renderTextCell

  return (
    <Flex direction='column'>
      <Labeled label={_paramContext.paramSchema.display}>
        <ScrollArea>
          <OptionFilter
            onSubmit={(options) => {
              const value = new Function('context', _paramContext.paramSchema.getInitialValue || '')({
                columns,
                paramSchema: { component: { props: { options } } },
              })

              const serializedValue = _paramContext.serializeFn({
                columns,
                paramSchema: { component: { props: { options } } },
                value,
              })

              props.onChange(serializedValue)
            }}
            options={options}
          />
          <MatrixTable.default<Dictionary, Dictionary, unknown>
            className={c(props.className, NAME)}
            context={{}}
            columns={columns as Any}
            options={options as Any}
            values={value as Any}
            renderCell={renderCell}
            onValuesChange={onChange as Any}
          />
        </ScrollArea>
      </Labeled>
    </Flex>
  )
}

/**
 * private
 */

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
