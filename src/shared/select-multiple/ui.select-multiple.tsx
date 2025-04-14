import { CheckboxGroup } from '@radix-ui/themes'
import type { RootProps } from '@radix-ui/themes/dist/esm/components/checkbox-group.d.ts'

import { useRef } from 'react'

import Button, { type ButtonProps } from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'
import Spinner from '~/shared/spinner'
import Text from '~/shared/text'
import { useElementSize } from '~/utils/core-hooks'
import { emptyFn } from '~/utils/function'
import { setRefs } from '~/utils/react'

export type Option = { value: string; display: string }

export type Props = Omit<RootProps, 'onChange'> & {
  defaultValue?: string[]
  options?: Option[]
  size?: '1' | '2' | '3' | '4'
  disabled?: boolean | undefined
  loading?: boolean | undefined
  variant?: ButtonProps['variant'] | undefined
  onValueChange?: ((values: string[], getValuesAsOptions: () => Option[]) => void) | undefined
}

export const NAME = 'selectMultiple-SelectMultiple'

export default function Component(props: Props): JSX.Element {
  const {
    options,
    value,
    loading,
    variant = 'surface',
    size: sizeProp = 2,
    onValueChange,
    onBlur,
    ...checkboxGroupRootProps
  } = props

  const el = useRef(null)
  const size = useElementSize(el.current)

  const valueLength = value?.length || 0

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={checkboxGroupRootProps.disabled} onBlur={(e) => onBlur?.(e as any)}>
        <Flex asChild={true} width='100%' maxWidth='100%' justify='between'>
          <button
            // variant={variant}
            className={`rt-reset rt-SelectTrigger rt-r-size-${sizeProp} rt-variant-${variant}`}
            color={checkboxGroupRootProps.disabled ? 'gray' : ('' as 'gray')}
            ref={setRefs(el)}
          >
            <Text asChild>
              <input
                onChange={emptyFn}
                className='rt-reset'
                tabIndex={-1}
                disabled={checkboxGroupRootProps.disabled}
                readOnly={true}
                style={{ width: '100%' }}
                value={options?.find((option) => option.value === value?.[0])?.display || ''}
              />
            </Text>
            <Flex align='center' gap='2'>
              {!loading && valueLength > 1 && (
                <Button color='amber' variant='surface' size='1' asChild={true}>
                  <Flex>+{valueLength - 1}</Flex>
                </Button>
              )}
              {loading && <Spinner />}
              <DropdownMenu.TriggerIcon />
            </Flex>
          </button>
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content style={{ width: `${size.width}px` || 'auto' }} align='center'>
        <CheckboxGroup.Root
          value={value}
          {...checkboxGroupRootProps}
          onValueChange={(v) => onValueChange?.(v, getValuesAsOptions(v))}
        >
          {options?.map((option) => (
            <Flex asChild={true} justify='start' width='100%' key={option.value}>
              <Button variant='outline' asChild={true} style={{ boxShadow: 'none', color: 'inherit' }}>
                <Text as='label'>
                  <CheckboxGroup.Item value={option.value} style={{ alignItems: 'center' }}>
                    <Text wrap='nowrap'>{option.display}</Text>
                  </CheckboxGroup.Item>
                </Text>
              </Button>
            </Flex>
          ))}
        </CheckboxGroup.Root>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )

  function getValuesAsOptions(value: string[]) {
    return () => value?.map((v) => options?.find((o) => o.value === v) as Option) || []
  }
}

Component.displayName = NAME
