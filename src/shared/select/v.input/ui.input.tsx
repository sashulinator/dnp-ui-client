import { Flex, Spinner } from '@radix-ui/themes'
import { mergeStyles } from '@radix-ui/themes/helpers'

import React, { type FormEventHandler } from 'react'

import Select from '~/shared/select'
import { c } from '~/utils/core'
import { emptyFn } from '~/utils/function'

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
  options?: Option[]
}

export default function Component(props: Props) {
  const {
    options = [],
    value = '',
    onChange = emptyFn,
    className,
    size = '2',
    variant = 'soft',
    loading,
    contentProps,
    ...triggerProps
  } = props

  return (
    <Select.Root onValueChange={onChange} value={value}>
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
