import Button from '~/shared/button'
import DropdownMenu from '~/shared/dropdown-menu'
import Tooltip from '~/shared/tooltip'

import { defaultIcon } from './constants.default-icon'
import Item, { type TreeItem } from './widgets.item'

export type Props = {
  tree: TreeItem
}

export const NAME = 'linkMenu-LinkMenu'

export default function Component(props: Props): JSX.Element {
  const { tree } = props

  return (
    <div style={{ width: 'fit-content', height: 'fit-content' }}>
      <DropdownMenu.Root>
        <Tooltip delayDuration={0} content={tree.name}>
          <DropdownMenu.Trigger>
            <Button asChild={true} square={true} variant='surface'>
              <span dangerouslySetInnerHTML={{ __html: tree.icon ?? defaultIcon }} />
            </Button>
          </DropdownMenu.Trigger>
        </Tooltip>

        <DropdownMenu.Content side='right'>
          <Item item={{ ...tree, children: undefined }} />
          {tree.children && (
            <>
              <DropdownMenu.Separator />
              {tree.children?.map((item, i) => <Item key={i + 'drop'} item={item} />)}
            </>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  )
}

Component.displayName = NAME
