import { Tooltip } from '@radix-ui/themes'

import { memo, useEffect } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { type FieldInputProps, useField } from '~/shared/form'
import Icon from '~/shared/icon'
import Labeled from '~/shared/labeled'
import TextInput, { type TextInputProps } from '~/shared/text-input'
import { c } from '~/utils/core'

import { type ComponentProps } from '../types'

export type Props = ComponentProps<
  TextInputProps & {
    fieldName: string
    input: FieldInputProps<string>
    label?: string | undefined
  }
>

const NAME = 'dnp-layoutSchema-textInputField'

export default function Component(props: Props): React.ReactNode {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, label, value, fieldName, onValueChange = defaultOnValueChange, children, content, context, block, setProps, blockComponent, ...restProps } = props

  const { input } = useField(fieldName || 'unknown', { subscription: { value: true } })
  useEffect(() => input.onChange(value), [value])
  // @ts-ignore

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
      <Labeled label={label}>
        <TextInput
          {...input}
          {...restProps}
          value={value || ''}
          style={{
            width: '100%',
            ...restProps.style,
          }}
          type='text'
          onValueChange={onValueChange as any}
          className={c(className)}
        />
      </Labeled>
    </Flex>
  )

  // Private

  function defaultOnValueChange(value: string | undefined) {
    setProps({ value })
  }

  function validateProps() {
    if (fieldName === undefined) return 'У компонента TextInputField отсутствует обязательный параметр fieldName'
  }
}

const TextField = memo(Component)
TextField.displayName = NAME
// export default TextField
