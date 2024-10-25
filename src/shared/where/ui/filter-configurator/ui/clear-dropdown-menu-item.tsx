import Button from '~dnp/shared/button'
import DropdownMenu from '~dnp/shared/dropdown-menu'
import Icon from '~dnp/shared/icon'
import { HighlightedText } from '~dnp/shared/text'

interface ClearDropdownMenuItemProps {
  onClick: () => void
}

export function ClearDropdownMenuItem(props: ClearDropdownMenuItemProps) {
  const { onClick } = props

  return (
    <DropdownMenu.Item onClick={onClick}>
      <Button square={true} size='1' variant='soft'>
        <Icon name='Clear' />
      </Button>
      <HighlightedText>Очистить</HighlightedText>
    </DropdownMenu.Item>
  )
}
