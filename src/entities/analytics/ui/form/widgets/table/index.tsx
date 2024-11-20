import {
  // Badge,
  Text,
} from '@radix-ui/themes'

import { useField } from 'react-final-form'

import { type AnalyticalActions } from '~/common/entities/analytical-actions'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
// import { Checkbox as FormCheckbox } from '~/shared/form'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'
import { setPath, walk } from '~/utils/dictionary'

// import Column from '../column'

export interface Props {
  className?: string | undefined
  columns: Record<
    string,
    {
      name: string
      display: string
      actions: AnalyticalActions[]
    }
  >
  name: string
  display: string
}

const NAME = 'dnp-e-analytics-Form-w-Table'

export default function Component(props: Props): JSX.Element {
  const {
    name,
    display,
    // columns
  } = props

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
    <Flex width='300px' className={c(props.className, NAME)} gap='4'>
      <Flex gap='2'>
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
          <HighlightedText tooltipContent='Бизнес название Таблицы'>{display}</HighlightedText>
          <Text color='gray'>{display}</Text>
        </Flex>
      </Flex>
      {/* <Flex direction='column'>
        {Object.values(columns).map((column) => {
          return (
            <Column
              key={column.name}
              actions={column.actions}
              name={`${name}.${column.name}`}
              display={column.display}
            />
          )
        })}
      </Flex> */}
    </Flex>
  )
}

Component.displayName = NAME
