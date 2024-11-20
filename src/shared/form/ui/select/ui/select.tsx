import React, { useId } from 'react'
import { FieldInputProps, FieldMetaState } from 'react-final-form'

import Flex, { FlexProps } from '~/shared/flex'
import Select, { SelectItemProps, SelectRootProps } from '~/shared/select'
import { c, fns } from '~/utils/core'

import { _checkErrorVisible } from '../../../lib/_check-error-visible'
import { _renderHint } from '../../../lib/_render-hint'
import { NAME as PARENT_NAME } from '../../form'
import Label from '../../label/ui/label'

export const NAME = `${PARENT_NAME}-w-TextField`

export type Props<FieldValue> = Omit<SelectRootProps, 'name' | 'value'> & {
  className?: string | undefined
  label?: string | undefined
  rootProps?: FlexProps | undefined
  variant?: 'soft'
  input: FieldInputProps<string, HTMLElement>
  meta: FieldMetaState<FieldValue>
  options?: (Omit<SelectItemProps, 'children'> & { display: React.ReactNode })[]
  renderHint?: (props: {
    input: FieldInputProps<string, HTMLElement>
    meta: FieldMetaState<FieldValue>
    isErrorVisible: boolean
  }) => React.ReactNode
  checkIsErrorVisible?: (props: {
    input: FieldInputProps<string, HTMLElement>
    meta: FieldMetaState<FieldValue>
  }) => boolean
}

export default function Component<FieldValue>(props: Props<FieldValue>) {
  const {
    input,
    meta,
    renderHint = _renderHint,
    label,
    className,
    rootProps,
    options = [],
    checkIsErrorVisible = _checkErrorVisible,
    variant = 'soft',
    ...selectRootProps
  } = props

  const id = useId()
  const isErrorVisible = checkIsErrorVisible({ input, meta })

  return (
    <Flex className={c(className, rootProps?.className, NAME)} direction='column' width='100%' {...rootProps}>
      <Label children={label} htmlFor={id} />
      <Select.Root onValueChange={fns(input.onChange)} value={input.value} {...selectRootProps}>
        <Select.Trigger onBlur={fns(input.onBlur)} variant={variant} />
        <Select.Content variant={variant}>
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
      {React.createElement(renderHint, { input, meta, isErrorVisible })}
    </Flex>
  )
}

Component.displayName = NAME
