import { useField } from 'react-final-form'

import { type AnalyticalActions } from '~/common/entities/analytics'
import Checkbox from '~/shared/checkbox'
import Flex from '~/shared/flex'
// import { Checkbox as FormCheckbox } from '~/shared/form'
import Text, { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'
import { map } from '~/utils/dictionary'

export interface Props {
  className?: string | undefined
  actions: AnalyticalActions[]
  name: string
  display: string
}

const NAME = 'dnp-e-analytics-Form-w-Column'

export default function Component(props: Props): JSX.Element {
  const {
    name,
    display,
    // actions
  } = props

  const field = useField(name)

  const actionsValuesArr = Object.entries(field.input.value)
  const selectedActionsValuesArr = actionsValuesArr.filter(([, value]) => value)

  const checked =
    selectedActionsValuesArr.length === actionsValuesArr.length
      ? true
      : selectedActionsValuesArr.length === 0
        ? false
        : 'indeterminate'

  return (
    <Flex className={c(props.className, NAME)} gap='4'>
      <Flex gap='2'>
        <Checkbox
          checked={checked}
          onCheckedChange={(checked) => {
            if (checked === 'indeterminate') return
            field.input.onChange(map(field.input.value, () => checked))
          }}
        />
        <Flex direction='column'>
          <HighlightedText tooltipContent='Бизнес название колонки'>{display}</HighlightedText>
          <Text color='gray'>{name}</Text>
        </Flex>
      </Flex>
      <Flex gap='2'>
        {/* {actions.map((action) => (
          <Badge key={action.name} color='amber'>
            <FormCheckbox name={`${name}.${action.name}`} />
            {action.display}
          </Badge>
        ))} */}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
