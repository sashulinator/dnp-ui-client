import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import TextHighlighter from '~/shared/text-highlighter'

import { type Comparison } from '../../../models/comparison'
import { type FilterConfig } from '../../../models/filter-config'
import { type Is } from '../../../models/is-filter'
import { type Match } from '../../../models/match'
import { useContext } from '../model/context'

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Contains
 */
export function MatchTypeDropdownMenuItem(): JSX.Element {
  const type = 'match'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({
        value: filterConfig.value,
        caseSensitive: filterConfig.caseSensitive,
        type,
      })}
      type={type}
      children='^$'
      label='Соответствует'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Contains
 */
export function ContainsTypeDropdownMenuItem(): JSX.Element {
  const type = 'contains'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({
        value: filterConfig.value,
        caseSensitive: filterConfig.caseSensitive,
        type,
      })}
      type={type}
      children='*'
      label='Содержит'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-StartsWith
 */
export function StartsWithTypeDropdownMenuItem(): JSX.Element {
  const type = 'startsWith'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({
        value: filterConfig.value,
        caseSensitive: filterConfig.caseSensitive,
        type,
      })}
      type={type}
      children='^*'
      label='Начинается'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-EndsWith
 */
export function EndsWithTypeDropdownMenuItem(): JSX.Element {
  const type = 'endsWith'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({
        value: filterConfig.value,
        caseSensitive: filterConfig.caseSensitive,
        type,
      })}
      type={type}
      children='*$'
      label='Заканчивается'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Equals
 */
export function EqualsTypeDropdownMenuItem(): JSX.Element {
  const type = 'equals'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({ value: filterConfig.value, type })}
      type={type}
      children='='
      label='Равен'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Gt
 */
export function GtTypeDropdownMenuItem(): JSX.Element {
  const type = 'gt'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({ value: filterConfig.value, type })}
      type={type}
      children='<'
      label='Больше чем'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Gte
 */
export function GteTypeDropdownMenuItem(): JSX.Element {
  const type = 'gte'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({ value: filterConfig.value, type })}
      type={type}
      children='<='
      label='Больше чем или равен'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Lt
 */
export function LtTypeDropdownMenuItem(): JSX.Element {
  const type = 'lt'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({ value: filterConfig.value, type })}
      children='>'
      type={type}
      label='Меньше чем'
    />
  )
}

/**
 * where-FilterConfigurator-c-DropdownMenuItem-v-Lte
 */
export function LteTypeDropdownMenuItem(): JSX.Element {
  const type = 'lte'

  return (
    <_TypeDropdownMenuItem
      buildFilterConfig={(filterConfig) => ({ value: filterConfig.value, type })}
      children='>='
      type={type}
      label='Меньше чем или равен'
    />
  )
}

/**
 * Private
 */

interface _TypeDropdownMenuItemProps {
  type: Comparison | Match | Is
  buildFilterConfig: (filterConfig: FilterConfig) => FilterConfig
  label: string
  children: React.ReactNode
}

function _TypeDropdownMenuItem(props: _TypeDropdownMenuItemProps) {
  const { label, type, children, buildFilterConfig } = props
  const { filterConfig, onFilterConfigChange } = useContext()

  const selected = filterConfig.type === type
  const color = selected ? 'amber' : 'gray'

  return (
    <DropdownMenu.Item onClick={() => onFilterConfigChange(buildFilterConfig(filterConfig))}>
      <Button square={true} size='1' variant='soft' color={color}>
        {children}
      </Button>
      {selected ? <TextHighlighter color='amber'>{label}</TextHighlighter> : label}
    </DropdownMenu.Item>
  )
}
