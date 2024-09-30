import { Checkbox } from '@radix-ui/themes'

import { useContext } from 'react'

import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Icon, { type map } from '~/shared/icon'
import { assertDefined } from '~/utils/core'

import { type Comparison } from '../../../models/comparison'
import { type Match } from '../../../models/match'
import { type ContextProps, context } from '../model/context'

/**
 * ui-Where-Dropdown-Menu-Item_Root
 */

export const ROOT_NAME = 'ui-Where-Dropdown-Menu-Item_Root'

export interface Props extends Required<ContextProps> {
  children: React.ReactNode
}

export default function Root(props: Props): JSX.Element {
  const { children, ...contextProps } = props

  return <context.Provider value={contextProps}>{children}</context.Provider>
}

Root.displayName = ROOT_NAME

interface ItemProps {
  type: Comparison | Match
  label: string
  iconName: keyof typeof map
}

function Item(props: ItemProps) {
  const { label, type, iconName } = props

  const ctx = useContext(context)
  assertDefined(ctx)

  return (
    <DropdownMenu.Item onClick={() => ctx.onFilterChange({ ...ctx.filterConfig, type })}>
      <Button
        square={true}
        size='1'
        variant='soft'
        color={(ctx.filterConfig.type === type ? 'amber' : undefined) as 'amber'}
      >
        <Icon name={iconName} />
      </Button>
      {label}
    </DropdownMenu.Item>
  )
}

export function CaseSensitive() {
  const ctx = useContext(context)
  assertDefined(ctx)

  return (
    <DropdownMenu.Item
      onClick={() => ctx.onFilterChange({ ...ctx.filterConfig, caseSensitive: !ctx.filterConfig.caseSensitive })}
    >
      <Checkbox size={'3'} checked={ctx.filterConfig.caseSensitive ?? false} />
      Учитывать регистр
    </DropdownMenu.Item>
  )
}

/**
 * ui-Where-Dropdown-Menu-Item_Contains
 */

export const CONTAINS_NAME = 'ui-Where-Dropdown-Menu-Item_Contains'

export function Contains(): JSX.Element {
  return <Item iconName='Star' type='contains' label='Содержит' />
}

Contains.displayName = CONTAINS_NAME

/**
 * ui-Where-Dropdown-Menu-Item_StartsWith
 */

export const STARTS_WITH_NAME = 'ui-Where-Dropdown-Menu-Item_StartsWith'

export function StartsWith(): JSX.Element {
  return <Item iconName='Star' type='startsWith' label='Начинается' />
}

StartsWith.displayName = STARTS_WITH_NAME

/**
 * ui-Where-Dropdown-Menu-Item_EndsWith
 */

export const ENDS_WITH_NAME = 'ui-Where-Dropdown-Menu-Item_EndsWith'

export function EndsWith(): JSX.Element {
  return <Item iconName='Star' type='endsWith' label='Заканчивается' />
}

EndsWith.displayName = ENDS_WITH_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Equals
 */

export const EQUALS_NAME = 'ui-Where-Dropdown-Menu-Item_Equals'

export function Equals(): JSX.Element {
  return <Item iconName='Star' type='equals' label='Равен' />
}

Equals.displayName = EQUALS_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Gt
 */

export const GT_NAME = 'ui-Where-Dropdown-Menu-Item_Gt'

export function Gt(): JSX.Element {
  return <Item iconName='Star' type='gt' label='Больше чем' />
}

Gt.displayName = GT_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Gte
 */

export const GTE_NAME = 'ui-Where-Dropdown-Menu-Item_Gte'

export function Gte(): JSX.Element {
  return <Item iconName='Star' type='gte' label='Больше чем или равен' />
}

Gte.displayName = GTE_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Equals
 */

export const LT_NAME = 'ui-Where-Dropdown-Menu-Item_Lt'

export function Lt(): JSX.Element {
  return <Item iconName='Star' type='lt' label='Меньше чем' />
}

Lt.displayName = LT_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Gte
 */

export const LTE_NAME = 'ui-Where-Dropdown-Menu-Item_Lte'

export function Lte(): JSX.Element {
  return <Item iconName='Star' type='lte' label='Меньше чем или равен' />
}

Lte.displayName = LTE_NAME
