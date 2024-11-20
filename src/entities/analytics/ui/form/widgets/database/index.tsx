import { Text } from '@radix-ui/themes'

import { useField } from 'react-final-form'

import { type AnalyticalActions } from '~/common/entities/analytical-actions'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'
import { setPath, walk } from '~/utils/dictionary'

import Schema from '../schema'

export interface Props {
  className?: string | undefined
  schemas: Record<
    string,
    {
      name: string
      display: string
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
    }
  >
  name: string
  display: string
}

const NAME = 'dnp-e-analytics-Form-w-DataBase'

export default function Component(props: Props): JSX.Element {
  const { name, display, schemas } = props

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
      <Flex gap='2' width='300px'>
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
          <HighlightedText tooltipContent='Бизнес название базы данных'>{display}</HighlightedText>
          <Text color='gray'>{display}</Text>
        </Flex>
      </Flex>
      <Flex gap='4' direction='column' width='100%'>
        {Object.values(schemas).map((schema) => {
          return (
            <Schema key={schema.name} tables={schema.tables} name={`${name}.${schema.name}`} display={schema.display} />
          )
        })}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
