import Field from '../../field'
import './text-field.scss'
import Flex from '~/ui/flex'
import Text from '~/ui/text'
import TextField, { TextFieldProps } from '~/ui/text-field'
import { c } from '~/utils/core'
import { emptyFn } from '~/utils/function'

export interface Props extends Omit<TextFieldProps, 'name' | 'value'> {
  className?: string | undefined
  name: string
  label?: string | undefined
  validate?: ((v: string) => unknown) | undefined
}

const displayName = 'ui-Form-w-TextField'

/**
 * ui-Form-w-TextField
 */
export default function Component(props: Props): JSX.Element {
  const { className, name, validate = emptyFn, label, type = 'text', ...textFieldProps } = props

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        return (
          <Flex direction='column' width='100%'>
            <Text className={c(className, displayName)} as='label' size='2'>
              {label}
              <TextField.Root className='textField' {...textFieldProps} {...input} type={type} />
            </Text>
            {(meta.error || meta.submitError) && meta.dirty && (
              <Text color='red'>{meta.error?.message || meta.submitError.message}</Text>
            )}
          </Flex>
        )
      }}
    </Field>
  )
}
Component.displayName = displayName
