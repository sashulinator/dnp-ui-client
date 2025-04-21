import type { ForwardedRef } from 'react'
import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'

import Checkbox from '~/shared/checkbox'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'
import Icon from '~/shared/icon'
import Input, { type InputProps } from '~/shared/input'
import Text from '~/shared/text'
import { fns } from '~/utils/core'
import { push, remove } from '~/utils/list'
import { setRefs } from '~/utils/react'

import { context, useContext } from './context'

// eslint-disable-next-line react-refresh/only-export-components
export { context, useContext }

export type RootProps = DropdownMenu.RootProps & {
  value: string[]
  onValueChange: (value: string[]) => void
  children: React.ReactNode
}

Root.displayName = 'ui-Multiselect'

export function Root(props: RootProps): JSX.Element {
  const [open, setOpen] = useState(false)

  const { value, onValueChange, ...dropdownRootProps } = props

  return (
    <DropdownMenu.Root
      {...dropdownRootProps}
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <context.Provider value={{ value, onValueChange, open, setOpen }}>{props.children}</context.Provider>
    </DropdownMenu.Root>
  )
}

type TriggerProps = InputProps & {
  placeholder?: string | undefined
  strings: {
    selected: string
  }
}

function TriggerWithRef(props: TriggerProps, ref: ForwardedRef<HTMLButtonElement>): JSX.Element {
  const { strings, ...inputProps } = props

  const { value } = useContext()

  return (
    <DropdownMenu.Trigger ref={setRefs(ref)}>
      <Input
        // prettier-ignore
        renderActionIcon={useCallback(() => <Icon name='ChevronDown' />, [])}
        {...inputProps}
      >
        {value.length > 0 ? (
          `${strings.selected} (${value.length})`
        ) : (
          <Text style={{ color: 'var(--gray-a10)' }}>{props.placeholder}</Text>
        )}
      </Input>
    </DropdownMenu.Trigger>
  )
}
export const Trigger = forwardRef(TriggerWithRef)

type ContentProps = DropdownMenu.ContentProps

export function Content(props: ContentProps): JSX.Element {
  const { ...contentProps } = props

  const ref = useRef<HTMLElement>(null)

  return <DropdownMenu.Content ref={setRefs(ref)} {...contentProps} />
}

type ItemProps = DropdownMenu.ItemProps & {
  value: string
  children: React.ReactNode
}

export function Item(props: ItemProps): JSX.Element {
  const { value: itemValue, children, ...dropdownItemProps } = props

  const { value, onValueChange } = useContext()

  const checked = useMemo(() => value.includes(itemValue), [itemValue, value])

  return (
    <DropdownMenu.Item
      {...dropdownItemProps}
      onClick={fns(dropdownItemProps.onClick, () => {
        onValueChange(checked ? remove(value.indexOf(itemValue), value) : push(itemValue, value))
      })}
    >
      <Flex gap='2' align='center'>
        <Checkbox checked={checked} />
        <Flex>{children}</Flex>
      </Flex>
    </DropdownMenu.Item>
  )
}
