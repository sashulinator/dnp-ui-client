import { Flex, Spinner } from '@radix-ui/themes'
import { mergeStyles } from '@radix-ui/themes/helpers'

import React, { type FormEventHandler } from 'react'

import Select from '~/shared/select'
import { c, fns } from '~/utils/core'

export const NAME = `select-v-Input`

export type Option = Omit<Select.ItemProps, 'children'> & { display: React.ReactNode }

export type Props = Omit<Select.TriggerProps, 'name' | 'value'> & {
  className?: string | undefined
  rootProps?: Select.RootProps | undefined
  contentProps?: Select.ContentProps | undefined
  value?: string | undefined
  size?: '1' | '2'
  loading?: boolean | undefined
  onChange?: (FormEventHandler<HTMLButtonElement> & ((value: string) => void)) | undefined
  onValueChange?: ((value: string) => void) | undefined
  options?: Option[]
}

export default function Component(props: Props) {
  const {
    options = [],
    value = '',
    onChange,
    className,
    size = '2',
    variant = 'soft',
    onValueChange,
    loading,
    contentProps,
    ...triggerProps
  } = props

  return (
    <Select.Root onValueChange={fns(onChange, (v) => onValueChange?.(v.toString()))} value={value}>
      <Flex width='100%' style={{ position: 'relative' }}>
        {loading && (
          <Spinner
            style={{ position: 'absolute', top: '50%', right: 'var(--space-6)', transform: 'translateY(-50%)' }}
          />
        )}
        <Select.Trigger
          {...{ size }}
          variant={variant}
          {...triggerProps}
          className={c(className, NAME)}
          style={mergeStyles({ width: '100%' }, props.style)}
        />
      </Flex>
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
