import Button from '~dnp/shared/button'
import DropdownMenu from '~dnp/shared/dropdown-menu'
import Flex from '~dnp/shared/flex'

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
      selected={!!filterConfig.notMode}
      onClick={() => onFilterConfigChange({ ...filterConfig, notMode: !filterConfig.notMode })}
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
          <_Checked checked={selected} />
          {label}
        </Flex>
      </Button>
    </DropdownMenu.Item>
  )
}

function _Checked(props: { checked: boolean }) {
  return (
    <div
      style={{
        width: '18px',
        height: '18px',
        borderStyle: 'solid',
        borderRadius: '50%',
        borderColor: 'var(--accent-a9)',
        borderWidth: props.checked ? '5px' : '5px',
      }}
    />
  )
}
