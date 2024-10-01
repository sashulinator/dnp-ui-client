import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'

import { useContext } from '../model/context'

/**
 * where-FilterConfigurator-c-ModeDropdownMenuItem-v-CaseSensitive
 */
export function CaseSensitiveModeDropdownMenuItem() {
  const { filterConfig, onFilterConfigChange } = useContext()

  return (
    <_ModeDropdownMenuItem
      label='Учитывать регистр'
      selected={!!filterConfig.caseSensitive}
      onClick={() => onFilterConfigChange({ ...filterConfig, caseSensitive: !filterConfig.caseSensitive })}
    />
  )
}

/**
 * where-FilterConfigurator-c-ModeDropdownMenuItem-v-CaseSensitive
 */
export function NotModeDropdownMenuItem() {
  const { filterConfig, onFilterConfigChange } = useContext()

  return (
    <_ModeDropdownMenuItem
      label='Не'
      selected={!!filterConfig.not}
      onClick={() => onFilterConfigChange({ ...filterConfig, not: !filterConfig.not })}
    />
  )
}

/**
 * Private
 */

interface _ModeDropdownMenuItemProps {
  onClick: (e: React.MouseEvent) => void
  selected: boolean
  label: string
}

export function _ModeDropdownMenuItem(props: _ModeDropdownMenuItemProps) {
  const { onClick, selected, label } = props

  return (
    <DropdownMenu.Item onClick={onClick}>
      <Button
        style={{ padding: 'var(--space-1)', width: '100%' }}
        color={(selected ? 'amber' : 'gray') as 'amber'}
        size='1'
        variant='soft'
      >
        <Flex width='100%' align='center' gap='2'>
          <Checkbox size='1' checked={selected} />
          {label}
        </Flex>
      </Button>
    </DropdownMenu.Item>
  )
}
