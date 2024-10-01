import Button from '~/shared/button'
import Checkbox from '~/shared/checkbox'
import DropdownMenu from '~/shared/dropdown-menu'
import Flex from '~/shared/flex'

import { useContext } from '../model/context'

/**
 * where-FilterConfigurator-c-CaseSensitiveDropdownMenuItem
 */
export function CaseSensitiveDropdownMenuItem() {
  const { filterConfig, onFilterConfigChange } = useContext()

  return (
    <DropdownMenu.Item
      onClick={() => onFilterConfigChange({ ...filterConfig, caseSensitive: !filterConfig.caseSensitive })}
    >
      <Button
        style={{ padding: 'var(--space-1)', width: '100%' }}
        color={(filterConfig.caseSensitive ? 'amber' : 'gray') as 'amber'}
        size='1'
        variant='soft'
      >
        <Flex width='100%' align='center' gap='2'>
          <Checkbox size='1' checked={!!filterConfig.caseSensitive} /> Учитывать регистр
        </Flex>
      </Button>
    </DropdownMenu.Item>
  )
}
