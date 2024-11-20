import { Text } from '@radix-ui/themes'

import { useField } from 'react-final-form'

import { type AnalyticalActions } from '~/common/entities/analytical-actions'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'
import { setPath, walk } from '~/utils/dictionary'

import Table from '../table'

export interface Props {
  className?: string | undefined
  tables: Record<
    string,
    {
      name: string
      display: string
      columns: Record<
        string,
        {
          name: string
          display: string
          actions: AnalyticalActions[]
        }
      >
    }
  >
  name: string
  display: string
}

const NAME = 'dnp-e-analytics-Form-w-Schema'

export default function Component(props: Props): JSX.Element {
  const { name, display, tables } = props

  const field = useField<{ [name: string]: AnalyticalActions[] }>(name)

  const flatValue: Record<string, boolean> = {}
  walk(field.input.value, ({ path, value }) => {
    if (typeof value !== 'boolean') return
    flatValue[path.join('.')] = value
  })

  const actionsValuesArr = Object.entries(flatValue)
  const selectedActionsValuesArr = actionsValuesArr.filter(([, value]) => value)

  const checked =
    selectedActionsValuesArr.length === actionsValuesArr.length
      ? true
      : selectedActionsValuesArr.length === 0
        ? false
        : 'indeterminate'

  return (
    <Flex className={c(props.className, NAME)} gap='4'>
      <Flex width='300px' gap='2'>
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => {
            if (checked === 'indeterminate') return
            let newValue = {}
            walk(field.input.value, ({ path, value }) => {
              if (typeof value !== 'boolean') return
              newValue = setPath(newValue, path, checked)
            })
            field.input.onChange(newValue)
          }}
        />
        <Flex direction='column'>
          <HighlightedText tooltipContent='Бизнес название схемы'>{display}</HighlightedText>
          <Text color='gray'>{display}</Text>
        </Flex>
      </Flex>
      <Flex direction='column'>
        {Object.values(tables).map((table) => {
          return (
            <Table key={table.name} columns={table.columns} name={`${name}.${table.name}`} display={table.display} />
          )
        })}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
