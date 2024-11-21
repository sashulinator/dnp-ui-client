import Flex from '~/shared/flex'
import Text from '~/shared/text'
import { c } from '~/utils/core'

import Checkbox, { type CheckboxProps } from '../../checkbox'

export interface Props extends CheckboxProps {
  label?: string | undefined
}

const NAME = 'dnp-sh-form-LabeledCheckbox'

export default function Component(props: Props): JSX.Element {
  const { className, label, ...checkboxProps } = props

  return (
    <Text className={c(className, NAME)} as='label' size='2'>
      <Flex gap='2' align='center'>
        <Checkbox {...checkboxProps} />
        {label}
      </Flex>
    </Text>
  )
}

Component.displayName = NAME
