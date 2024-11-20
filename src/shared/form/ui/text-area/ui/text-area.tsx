import { Box } from '@radix-ui/themes'

import React, { useId } from 'react'
import { type FieldInputProps, type FieldMetaState } from 'react-final-form'

import Flex, { type FlexProps } from '~/shared/flex'
import TextArea, { type TextAreaProps } from '~/shared/text-area'
import { c, fns } from '~/utils/core'

import { NAME as PARENT_NAME } from '../../form'
import Label from '../../label/ui/label'

export const NAME = `${PARENT_NAME}-w-TextArea`

export type Props<FieldValue> = Omit<TextAreaProps, 'name' | 'value'> & {
  label?: string | undefined | React.ReactElement
  rootProps?: FlexProps | undefined
  input: FieldInputProps<string, HTMLInputElement>
  meta: FieldMetaState<FieldValue>
  maxWidthBox?: string
  isDisabled?: boolean
}

export default function Component<FieldValue>(props: Props<FieldValue>) {
  const {
    input,
    className,
    label,
    rootProps,
    isDisabled = false,
    maxWidthBox = '100%',
    variant = 'soft',
    ...textAreaProps
  } = props

  const id = useId()

  return (
    <Flex className={c(className, rootProps?.className, NAME)} direction='column' {...rootProps}>
      <Label children={label} htmlFor={id} />
      <Box maxWidth={maxWidthBox}>
        <TextArea
          readOnly={isDisabled}
          disabled={isDisabled}
          {...textAreaProps}
          id={id}
          variant={variant}
          value={input.value}
          onChange={fns(input.onChange, textAreaProps.onChange)}
        />
      </Box>
    </Flex>
  )
}

Component.displayName = NAME
