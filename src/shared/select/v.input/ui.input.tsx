import { Flex, Spinner } from '@radix-ui/themes'
import { mergeStyles } from '@radix-ui/themes/helpers'

import React, { type FormEventHandler, useEffect, useState } from 'react'

import Button from '~/shared/button'
import Icon from '~/shared/icon'
import Select from '~/shared/select'
import { c, fns, generateId } from '~/utils/core'

export const NAME = `ui-select--input`

export type Option = Omit<Select.ItemProps, 'children'> & { display: React.ReactNode }

export type Props = Omit<Select.TriggerProps, 'name' | 'value' | 'type'> & {
  className?: string | undefined
  rootProps?: Select.RootProps | undefined
  contentProps?: Select.ContentProps | undefined
  value?: string | undefined
  size?: '1' | '2'
  defaultValue?: string | undefined
  loading?: boolean | undefined
  clearable?: boolean | undefined
  onChange?: (FormEventHandler<HTMLButtonElement> & ((value: string) => void)) | undefined
  onValueChange?: ((value: string) => void) | undefined
  options?: Option[]
}

export default function Component(props: Props) {
  const {
    options = [],
    value = '',
    disabled,
    onChange,
    className,
    size = '2',
    variant = 'soft',
    onValueChange,
    loading,
    contentProps,
    clearable,
    ...triggerProps
  } = props

  const hasValue = !!value

  const [key, setKey] = useState(generateId)
  useEffect(() => {
    if (!value) setKey(generateId())
  }, [value])

  return (
    <Select.Root
      key={key}
      disabled={disabled as boolean}
      onValueChange={fns(onChange, (v) => onValueChange?.(v.toString()))}
      // КОСТЫЛЬ! Делаем ыf потому что если установить значение а потом сбросить то отображается предыдущее
      value={value as string}
    >
      <Flex width='100%' style={{ position: 'relative' }}>
        <Flex>
          {clearable && hasValue && !disabled && !loading && (
            <Flex style={{ position: 'absolute', top: '50%', right: 'var(--space-6)', transform: 'translateY(-50%)' }}>
              <Button
                round={true}
                size={'1'}
                variant='ghost'
                onClick={() => {
                  onValueChange?.('')
                  onChange?.('')
                }}
              >
                <Icon name='Cross1' />
              </Button>
            </Flex>
          )}
          {loading && (
            <Spinner
              style={{ position: 'absolute', top: '50%', right: 'var(--space-6)', transform: 'translateY(-50%)' }}
            />
          )}
        </Flex>
        <Select.Trigger
          {...{ size }}
          variant={variant}
          {...triggerProps}
          className={c(className, NAME)}
          style={mergeStyles({ width: '100%', pointerEvents: disabled ? 'none' : undefined }, props.style)}
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
