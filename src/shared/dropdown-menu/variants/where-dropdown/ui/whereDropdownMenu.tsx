import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Icon from '~/shared/icon'

import { type ContextProps, WhereDropdownContext, useWhereDropdownContext } from '../model/context'

/**
 * ui-Where-Dropdown-Menu-Item_Root
 */

export const ROOT_NAME = 'ui-Where-Dropdown-Menu-Item_Root'

export interface Props extends Required<ContextProps> {
  children: React.ReactNode
}

export default function Root(props: Props): JSX.Element {
  const { children, ...contextProps } = props

  return <WhereDropdownContext.Provider value={contextProps}>{children}</WhereDropdownContext.Provider>
}

Root.displayName = ROOT_NAME

const WhereDropdownMenuItem: React.FC<{ filterType: string; label: string }> = ({ filterType, label }) => {
  const { accessorKey, searchValue, onChange, isActive } = useWhereDropdownContext()

  return (
    <DropdownMenu.Item
      onClick={() => {
        onChange((s) => ({ ...s, [accessorKey]: { [filterType]: searchValue } }))
      }}
    >
      <Button
        square={true}
        size='1'
        variant='soft'
        color={(Object.keys(isActive || {}).includes(filterType) ? 'amber' : undefined) as 'amber'}
      >
        <Icon name='Star' />
      </Button>
      {label}
    </DropdownMenu.Item>
  )
}

/**
 * ui-Where-Dropdown-Menu-Item_Contains
 */

export const CONTAINS_NAME = 'ui-Where-Dropdown-Menu-Item_Contains'

export function Contains(): JSX.Element {
  return <WhereDropdownMenuItem filterType='contains' label='Содержит' />
}

Contains.displayName = CONTAINS_NAME

/**
 * ui-Where-Dropdown-Menu-Item_StartsWith
 */

export const STARTS_WITH_NAME = 'ui-Where-Dropdown-Menu-Item_StartsWith'

export function StartsWith(): JSX.Element {
  return <WhereDropdownMenuItem filterType='startsWith' label='Начинается' />
}

StartsWith.displayName = STARTS_WITH_NAME

/**
 * ui-Where-Dropdown-Menu-Item_EndsWith
 */

export const ENDS_WITH_NAME = 'ui-Where-Dropdown-Menu-Item_EndsWith'

export function EndsWith(): JSX.Element {
  return <WhereDropdownMenuItem filterType='endsWith' label='Заканчивается' />
}

EndsWith.displayName = ENDS_WITH_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Equals
 */

export const EQUALS_NAME = 'ui-Where-Dropdown-Menu-Item_Equals'

export function Equals(): JSX.Element {
  return <WhereDropdownMenuItem filterType='equals' label='Равен' />
}

Equals.displayName = EQUALS_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Gt
 */

export const GT_NAME = 'ui-Where-Dropdown-Menu-Item_Gt'

export function Gt(): JSX.Element {
  return <WhereDropdownMenuItem filterType='gt' label='Больше чем' />
}

Gt.displayName = GT_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Gte
 */

export const GTE_NAME = 'ui-Where-Dropdown-Menu-Item_Gte'

export function Gte(): JSX.Element {
  return <WhereDropdownMenuItem filterType='gte' label='Больше чем или равен' />
}

Gte.displayName = GTE_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Equals
 */

export const LT_NAME = 'ui-Where-Dropdown-Menu-Item_Lt'

export function Lt(): JSX.Element {
  return <WhereDropdownMenuItem filterType='lt' label='Меньше чем' />
}

Lt.displayName = LT_NAME

/**
 * ui-Where-Dropdown-Menu-Item_Gte
 */

export const LTE_NAME = 'ui-Where-Dropdown-Menu-Item_Lte'

export function Lte(): JSX.Element {
  return <WhereDropdownMenuItem filterType='lte' label='Меньше чем или равен' />
}

Lte.displayName = LTE_NAME
