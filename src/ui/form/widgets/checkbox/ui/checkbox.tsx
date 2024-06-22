import { Field } from 'react-final-form'
import Checkbox, { CheckboxProps } from '~/ui/checkbox'
import Flex from '~/ui/flex'
import Text from '~/ui/text'
import { c } from '~/utils/core'
import { remove } from '~/utils/dictionary'

export interface Props extends Omit<CheckboxProps, 'name'> {
  className?: string | undefined
  name: string
  label?: string | undefined
}

const displayName = 'ui-Form-w-Checkbox'

/**
 * ui-Form-w-Checkbox
 */
export default function Component(props: Props): JSX.Element {
  const { className, name, label, ...textFieldProps } = props

  return (
    <Field<boolean> type='checkbox' name={name}>
      {({ input }) => {
        const newInput = remove(input, 'value')

        return (
          <Text className={c(className, displayName)} as='label' size='2'>
            <Flex gap='2' align='center'>
              <Checkbox
                onCheckedChange={newInput.onChange}
                defaultChecked={newInput.checked}
                className='checkbox'
                {...textFieldProps}
                {...newInput}
                type='button'
              />
              {label}
            </Flex>
          </Text>
        )
      }}
    </Field>
  )
}
Component.displayName = displayName
