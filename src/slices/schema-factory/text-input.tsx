import { Tooltip } from '@radix-ui/themes'

import { memo, useEffect } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { useField } from '~/shared/form'
import Icon from '~/shared/icon'
import UiTextInput, { type TextInputProps as UiTextInputProps } from '~/shared/text-input'
import { c, fns } from '~/utils/core'

import { type ComponentProps } from './models'

export type Props = ComponentProps<UiTextInputProps & { fieldName: string }>

const NAME = 'dnp-layoutSchema-textInput'

export const TextInput = memo((props: Props): React.ReactNode => {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, fieldName, value, onValueChange, children, content, context, block, setProps, blockComponent, ...restProps } = props

  const { input } = useField(fieldName || 'unknown')

  useEffect(() => {
    if (value === undefined) return
    input.onChange(value)
  }, [value])

  const error = validateProps()

  return (
    <Flex direction='column' position='relative' width='100%'>
      {error && (
        <Tooltip content={error}>
          <Button size='1' round={true} style={{ position: 'absolute' }} variant='solid' color='red'>
            <Icon name='InfoCircled' />
          </Button>
        </Tooltip>
      )}
      <UiTextInput
        {...input}
        {...restProps}
        style={{
          width: '100%',
          ...restProps.style,
        }}
        type='text'
        onValueChange={fns(onValueChange, (value) => setProps({ value }))}
        className={c(className)}
      />
    </Flex>
  )

  // Private

  function validateProps() {
    if (fieldName === undefined) return 'У компонента TextInput отсутствует обязательный параметр fieldName'
  }
})

TextInput.displayName = NAME
