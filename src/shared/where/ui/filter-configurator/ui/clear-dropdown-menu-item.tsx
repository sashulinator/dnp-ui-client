import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Icon from '~/shared/icon'
import TextHighlighter from '~/shared/text-highlighter'

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
      <TextHighlighter>Очистить</TextHighlighter>
    </DropdownMenu.Item>
  )
}
