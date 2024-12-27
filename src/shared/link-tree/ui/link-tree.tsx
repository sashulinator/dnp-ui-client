import { createElement, useState } from 'react'
import { NavLink } from 'react-router-dom'

import Button from '~/shared/button'
import Collapse from '~/shared/collapse'
import Flex, { type FlexProps } from '~/shared/flex'
import Icon from '~/shared/icon'
import Text from '~/shared/text'
import { c, isEmpty } from '~/utils/core'

export type TreeItem = {
  id: string
  name: string
  link?: {
    url: string
    blank?: boolean | undefined
  }
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

  const linkContent = (
    <Text>
      <Flex minWidth='22px' minHeight='22px' align='center' justify='center'>
        {item.renderIcon && createElement(item.renderIcon)}
      </Flex>
      <Text style={{ width: '100%', display: 'block', textAlign: 'left', lineHeight: '1rem', wordBreak: 'break-word' }}>
        {item.name}
        {item.link?.blank && <Icon style={{ marginLeft: '5px' }} name='ExternalLink' />}
      </Text>
      {!isEmpty(item?.children) && (
        <Button
          ml='auto'
          variant='soft'
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
    </Text>
  )

  return (
    <Flex direction='column' pl={`${isRoot ? 0 : offset}px`}>
      <Flex width='100%' align='center'>
        <Flex width='100%'>
          {item.link ? (
            <NavLink
              style={{ width: '100%' }}
              to={item.link.url ?? location.href}
              end
              {...(item.link.blank && { target: '_blank' })}
            >
              {({ isActive }) => {
                return (
                  <Button
                    style={{ width: '100%', boxShadow: 'none', opacity: isActive ? '1' : '0.7' }}
                    color={isActive ? 'amber' : 'gray'}
                    variant='outline'
                    asChild={true}
                  >
                    {linkContent}
                  </Button>
                )
              }}
            </NavLink>
          ) : (
            <Button
              color={'gray'}
              asChild={true}
              variant='outline'
              onClick={() => {
                setExpanded((s) => {
                  onExpanded?.(newPath, !s)
                  return !s
                })
              }}
              style={{ width: '100%', boxShadow: 'none', opacity: '0.7' }}
            >
              {linkContent}
            </Button>
          )}
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
