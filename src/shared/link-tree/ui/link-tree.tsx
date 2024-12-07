import { createElement, useState } from 'react'

import Button from '~/shared/button'
import Collapse from '~/shared/collapse'
import Flex, { type FlexProps } from '~/shared/flex'
import Icon from '~/shared/icon'
import Link from '~/shared/link'
import { c, isEmpty } from '~/utils/core'

export type TreeItem = {
  id: string
  name: string
  link?: string
  renderIcon?: (() => JSX.Element) | undefined
  children?: TreeItem[] | undefined
}

export type ExpandedTree = {
  children: TreeItem[]
}

export interface Props {
  className?: string | undefined
  rootProps?: FlexProps | undefined
  offset?: number
  tree: TreeItem[]
  expanded: Record<string, boolean>
  onExpanded?: ((path: string, expanded: boolean) => void) | undefined
}

const NAME = 'linkTree-LinkTree'

export default function Component(props: Props): JSX.Element {
  const OFFSET = 8

  const { rootProps, offset = OFFSET, tree, expanded, onExpanded } = props

  return (
    <Flex {...rootProps} width='100%' direction='column' className={c(props.className, NAME)}>
      {tree.map((item, index) => (
        <_Item
          expanded={expanded}
          onExpanded={onExpanded}
          key={index}
          item={item}
          path={''}
          offset={offset}
          isRoot={true}
        />
      ))}
    </Flex>
  )
}

Component.displayName = NAME

interface _ItemProps {
  offset: number
  isRoot?: boolean
  path: string
  item: TreeItem
  expanded: Record<string, boolean>
  onExpanded?: ((path: string, expanded: boolean) => void) | undefined
}

function _Item(props: _ItemProps) {
  const { isRoot, offset, item, path, expanded, onExpanded } = props

  const newPath = isRoot ? item.id : `${path}.${item.id}`

  const [isExpanded, setExpanded] = useState(expanded[newPath] || false)

  const text = (
    <>
      <Flex width='22px' height='22px' align='center' justify='center'>
        {item.renderIcon && createElement(item.renderIcon)}
      </Flex>
      {item.name}
      {!isEmpty(item?.children) && (
        <Button
          ml='auto'
          round={true}
          size='1'
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            setExpanded((s) => {
              onExpanded?.(newPath, !s)
              return !s
            })
          }}
        >
          <Icon name={isExpanded ? 'ChevronDown' : 'ChevronRight'} />
        </Button>
      )}
    </>
  )

  return (
    <Flex direction='column' pl={`${isRoot ? 0 : offset}px`} mt='2'>
      <Flex width='100%' align='center'>
        <Flex width='100%'>
          <Button variant='ghost' asChild={true} style={{ width: '100%', justifyContent: 'flex-start' }}>
            {item.link ? (
              <Link style={{ width: '100%' }} to={item.link ?? location.href}>
                {text}
              </Link>
            ) : (
              <Flex width='100%'>{text}</Flex>
            )}
          </Button>
        </Flex>
      </Flex>
      {!isEmpty(item.children) && (
        <Collapse isExpanded={isExpanded}>
          <Flex direction={'column'}>
            {item.children?.map((item, index) => (
              <_Item
                key={index}
                expanded={expanded}
                item={item}
                path={newPath}
                offset={offset}
                onExpanded={onExpanded}
              />
            ))}
          </Flex>
        </Collapse>
      )}
    </Flex>
  )
}
