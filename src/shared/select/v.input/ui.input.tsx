import React, { type FormEventHandler } from 'react'

import Select, { type SelectProps } from '~/shared/select'
import { c } from '~/utils/core'
import { emptyFn } from '~/utils/function'

export const NAME = `select-v-Input`

export type Option = Omit<SelectProps.ItemProps, 'children'> & { display: React.ReactNode }

export type Props = Omit<SelectProps.TriggerProps, 'name' | 'value'> & {
  className?: string | undefined
  rootProps?: SelectProps.RootProps | undefined
  contentProps?: SelectProps.ContentProps | undefined
  value?: string | undefined
  onChange?: (FormEventHandler<HTMLButtonElement> & ((value: string) => void)) | undefined
  options?: Option[]
}

export default function Component(props: Props) {
  const {
    options = [],
    value = '',
    onChange = emptyFn,
    className,
    variant = 'soft',
    contentProps,
    ...triggerProps
  } = props

  return (
    <Select.Root onValueChange={onChange} value={value}>
      <Select.Trigger variant={variant} {...triggerProps} className={c(className, NAME)} />
      <Select.Content {...contentProps}>
        {options.map((option, i) => {
          return (
            <Select.Item key={i} {...option}>
              {option.display}
            </Select.Item>
          )
        })}
      </Select.Content>
    </Select.Root>
  )
}

Component.displayName = NAME
