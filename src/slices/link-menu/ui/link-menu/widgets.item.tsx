import { DropdownMenu, Flex } from '@radix-ui/themes'

import Button from '~/shared/button'
import Link from '~/shared/link'
import { HighlightedText } from '~/shared/text'
import { c } from '~/utils/core'

import { defaultIcon } from './constants.default-icon'

export type TreeItem = {
  name: string
  icon?: string | undefined
  link?: string | undefined
  children?: TreeItem[] | undefined
}

export interface Props {
  className?: string | undefined
  item: TreeItem
}

const NAME = 'linkMenu-Linkmenu-w-Item'

export default function Component(props: Props): JSX.Element {
  if (!props.item.children) {
    return (
      <>
        {props.item.link ? (
          <DropdownMenu.Item className={c(props.className, NAME)}>
            <Link to={props.item.link} onClick={(e) => e.stopPropagation()}>
              <Flex gap={'2'}>
                <Button size={'1'} square={true} variant='soft' asChild={true}>
                  <span dangerouslySetInnerHTML={{ __html: props.item.icon ?? defaultIcon }} />
                </Button>
                <HighlightedText>{props.item.name}</HighlightedText>
              </Flex>
            </Link>
          </DropdownMenu.Item>
        ) : (
          <DropdownMenu.Item className={c(props.className, NAME)}>
            <Flex gap={'3'}>
              <Button asChild={true} size={'1'} square={true} variant='soft'>
                <span dangerouslySetInnerHTML={{ __html: props.item.icon ?? defaultIcon }} />
              </Button>
              {props.item.name}
            </Flex>
          </DropdownMenu.Item>
        )}
      </>
    )
  }
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>
        {props.item.link ? (
          <Link className='no-style' to={props.item.link} onClick={(e) => e.stopPropagation()}>
            <Flex gap={'2'}>
              <Button size={'1'} square={true} variant='soft' asChild={true}>
                <span dangerouslySetInnerHTML={{ __html: props.item.icon ?? defaultIcon }} />
              </Button>
              <HighlightedText>{props.item.name}</HighlightedText>
            </Flex>
          </Link>
        ) : (
          <Flex gap={'3'}>
            <Button size={'1'} square={true} variant='soft' asChild={true}>
              <span dangerouslySetInnerHTML={{ __html: props.item.icon ?? defaultIcon }} />
            </Button>
            {props.item.name}
          </Flex>
        )}
      </DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        {props.item.children.map((item, i) => (
          <Component key={i} item={item} />
        ))}
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
  )
}

Component.displayName = NAME
