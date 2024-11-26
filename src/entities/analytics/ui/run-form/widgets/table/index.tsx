import {
  // Badge,
  Text,
} from '@radix-ui/themes'

import { useField } from 'react-final-form'

import { type Action } from '~/common/entities/analytics'
import { TreeCheckbox } from '~/shared/checkbox'
import Flex from '~/shared/flex'
// import { Checkbox as FormCheckbox } from '~/shared/form'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

// import Column from '../column'

export interface Props {
  className?: string | undefined
  columns: Record<
    string,
    {
      name: string
      display: string
      actions: Action[]
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

  const field = useField<{ [name: string]: Action[] }>(name)

  return (
    <Flex width='300px' className={c(props.className, NAME)} gap='4'>
      <Flex gap='2'>
        <TreeCheckbox treeChecked={field.input.value} onTreeCheckedChange={field.input.onChange} />
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
