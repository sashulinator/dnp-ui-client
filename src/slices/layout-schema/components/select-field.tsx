import { Tooltip } from '@radix-ui/themes'

import { memo, useEffect } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import { type FieldInputProps, useField } from '~/shared/form'
import Icon from '~/shared/icon'
import Labeled from '~/shared/labeled'
import { SelectInput } from '~/shared/select'
import { c, fns } from '~/utils/core'

import { type ComponentProps } from '../types'

export type Props = ComponentProps<
  SelectInput.InputProps & {
    fieldName: string
    input: FieldInputProps<string>
    label?: string | undefined
    format: (v: string) => string
    parse: (v: string) => string
  }
>

const NAME = 'dnp-layoutSchema-selectField'

const TextInputField = memo((props: Props): React.ReactNode => {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, input: _, label, format, parse, fieldName, onValueChange, children, content, context, block, setProps, blockComponent, ...restProps } = props

  const { input } = useField(fieldName || 'unknown', { format, parse })
  // @ts-ignore
  useEffect(() => setProps({ input }), [input.value])

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
        <SelectInput.default
          {...input}
          {...restProps}
          style={{
            width: '100%',
            ...restProps.style,
          }}
          onValueChange={fns(onValueChange, input.onChange)}
          className={c(className)}
        />
      </Labeled>
    </Flex>
  )

  // Private

  function validateProps() {
    if (fieldName === undefined) return 'У компонента SelectField отсутствует обязательный параметр fieldName'
  }
})
export default TextInputField

TextInputField.displayName = NAME
