import Flex from '~/shared/flex'
import { Field, FieldRenderProps } from '~/shared/form'
import TagPicker, { TagPickerProps } from '~/shared/tag-picker'
import Text from '~/shared/text'
import { c } from '~/utils/core'

export type Props = Omit<TagPickerProps, 'value' | 'onChange'> & {
  name: string
  label?: string | undefined
}

const displayName = 'ui-Form-widgets-TagPicker'
const initialValue: string[] = []

/**
 * ui-Form-widgets-TagPicker'
 */
export default function Component(props: Props): JSX.Element {
  const { name, label, className, ...tagPickerProps } = props

  return (
    <Field<string[], FieldRenderProps<string[], HTMLElement, string[]>> name={name} initialValue={initialValue}>
      {({ input }) => {
        return (
          <Text as='div' className={c(className, displayName)} size='2'>
            <Flex direction='column' gap='1'>
              {label}
              <TagPicker {...input} {...tagPickerProps} className={c(props.className, displayName)} />
            </Flex>
          </Text>
        )
      }}
    </Field>
  )
}

Component.displayName = displayName
