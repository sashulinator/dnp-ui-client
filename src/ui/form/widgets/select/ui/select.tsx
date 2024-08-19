import { InfoCircledIcon } from '@radix-ui/react-icons'
import { useId } from 'react'
import Field from '../../field'
import Label from '../../label/ui/label'
import Flex, { FlexProps } from '~/ui/flex'
import Select, { SelectRootProps, SelectItemProps } from '~/ui/select'
import Text from '~/ui/text'
import { c } from '~/utils/core'
import { emptyFn } from '~/utils/function'

export interface Props extends Omit<SelectRootProps, 'name' | 'value'> {
  className?: string | undefined
  name: string
  label?: string | undefined
  rootProps?: FlexProps | undefined
  validate?: ((v: string) => unknown) | undefined
  options: (Omit<SelectItemProps, 'children'> & { display: React.ReactNode })[]
}

export const NAME = 'ui-Form-w-Select'

/**
 * ui-Form-w-Select'
 */
export default function Component(props: Props): JSX.Element {
  const { className, name, validate = emptyFn, label, rootProps, options, ...selectRootProps } = props
  const id = useId()

  return (
    <Field name={name} validate={validate}>
      {({ input, meta }) => {
        const showError = (meta.error || meta.submitError) && meta.touched
        const { onChange, ...restInput } = input

        return (
          <Flex className={c(className, NAME, rootProps?.className)} direction='column' width='100%' {...rootProps}>
            <Label className={`${NAME}_label}`} content={label} htmlFor={id} />
            <Select.Root onValueChange={onChange} {...restInput} {...selectRootProps}>
              <Select.Trigger variant='soft' />
              <Select.Content variant='soft'>
                <Select.Group>
                  {options.map((option, i) => {
                    return (
                      <Select.Item key={i} {...option}>
                        {option.display}
                      </Select.Item>
                    )
                  })}
                </Select.Group>
              </Select.Content>
            </Select.Root>
            {showError && (
              <Text size='1' color='red' asChild>
                <Flex align='center' gap='1'>
                  <InfoCircledIcon />
                  {meta.error?.message || meta.submitError.message}
                </Flex>
              </Text>
            )}
          </Flex>
        )
      }}
    </Field>
  )
}

Component.displayName = NAME
