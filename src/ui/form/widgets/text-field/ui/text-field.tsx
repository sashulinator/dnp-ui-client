import { Field } from 'react-final-form'
import './text-field.scss'

import Text from '~/ui/text'
import TextField, { TextFieldProps } from '~/ui/text-field'
import { c } from '~/utils/core'

export interface Props extends Omit<TextFieldProps, 'name' | 'value'> {
  className?: string | undefined
  name: string
  label?: string | undefined
}

const displayName = 'ui-Form-w-TextField'

/**
 * ui-Form-w-TextField
 */
export default function Component(props: Props): JSX.Element {
  const { className, name, label, type = 'text', ...textFieldProps } = props

  return (
    <Field name={name}>
      {({ input }) => {
        return (
          <Text className={c(className, displayName)} as='label' size='2'>
            {label}
            <TextField.Root className='textField' {...textFieldProps} {...input} type={type} />
          </Text>
        )
      }}
    </Field>
  )
}
Component.displayName = displayName
