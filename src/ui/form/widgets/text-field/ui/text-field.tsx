import { useId } from 'react'
import { FieldRenderProps } from 'react-final-form'
import Field from '../../field'
import Hint from '../../hint'
import Label from '../../label/ui/label'
import Flex, { FlexProps } from '~/ui/flex'
import TextField, { TextFieldProps } from '~/ui/text-field'
import { c } from '~/utils/core'
import { emptyFn } from '~/utils/function'

export interface Props extends Omit<TextFieldProps, 'name' | 'value'> {
  className?: string | undefined
  name: string
  label?: string | undefined
  rootProps?: FlexProps | undefined
  validate?: ((v: string) => unknown) | undefined
}

const NAME = 'ui-Form-w-TextField'

/**
 * ui-Form-w-TextField
 */
export default function Component<FieldValue, RP extends FieldRenderProps<FieldValue, HTMLInputElement, string>>(
  props: Props,
): JSX.Element {
  const { className, name, validate = emptyFn, label, type = 'text', rootProps, ...textFieldProps } = props
  const id = useId()

  return (
    <Field<FieldValue, RP, HTMLInputElement, string> type={type} name={name} validate={validate}>
      {({ input, meta }) => {
        const showError = (meta.error || meta.submitError) && meta.touched

        return (
          <Flex className={c(className, NAME, rootProps?.className)} direction='column' width='100%' {...rootProps}>
            <Label className={`${NAME}_label}`} content={label} htmlFor={id} />
            <TextField.Root
              color={showError ? 'red' : undefined}
              id={id}
              {...textFieldProps}
              {...input}
              className={c(`${NAME}_textField`)}
              type={type}
            />
            {showError && <Hint type='error' content={meta.error.message || meta.submitError.message} />}
          </Flex>
        )
      }}
    </Field>
  )
}

Component.displayName = NAME
