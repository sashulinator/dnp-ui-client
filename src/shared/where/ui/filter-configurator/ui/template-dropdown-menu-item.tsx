import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Icon from '~/shared/icon'
import TextHighlighter from '~/shared/text-highlighter'

import { type ComparisonKey } from '../../../models/comparison'
import { type FilterConfig } from '../../../models/filter-config'
import { IS, type IsKey } from '../../../models/is-filter'
import { type MatchKey } from '../../../models/match'
import { useContext } from '../model/context'

/**
 * template-FilterConfigurator-c-DropdownMenuItem-v-not
 */
export function NotEmptyTemplateDropdownMenuItem(): JSX.Element {
  const type = IS.not
  const value = null

  return (
    <_TemplateDropdownMenuItem
      label='Не пусто'
      value={value}
      type={type}
      buildFilterConfig={() => ({ value, type })}
      children={<Icon name='Check' />}
    />
  )
}

/**
 * template-FilterConfigurator-c-DropdownMenuItem-v-not
 */
export function EmptyTemplateDropdownMenuItem(): JSX.Element {
  const type = IS.is
  const value = null

  return (
    <_TemplateDropdownMenuItem
      label='Пусто'
      value={value}
      type={type}
      buildFilterConfig={() => ({ value, type })}
      children={<Icon name='Cross2' />}
    />
  )
}

/**
 * Private
 */
interface _TemplateDropdownMenuItemProps {
  type: ComparisonKey | MatchKey | IsKey
  buildFilterConfig: (filterConfig: FilterConfig) => FilterConfig
  label: string
  value: unknown
  children: React.ReactNode
}

function _TemplateDropdownMenuItem(props: _TemplateDropdownMenuItemProps) {
  const { label, type, value, children, buildFilterConfig } = props
  const { filterConfig, onFilterConfigChange } = useContext()

  const selected = filterConfig.type === type && filterConfig.value === value
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
