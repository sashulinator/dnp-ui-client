import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Explorer, Path } from '../../../types/explorer'
import Item from '../widgets/item'
import Type from '../widgets/type'
import Button from '~/ui/button'
import Flex from '~/ui/flex'
import ScrollArea from '~/ui/scroll-area'
import { c } from '~/utils/core'
export interface Props {
  className?: string | undefined
  data: Explorer | undefined
  loading?: boolean | undefined
  listHeight?: string | undefined
  paths: Path[] | undefined
  onPathChange: (paths: Path[]) => void
}

export const NAME = 'explorer-Viewer'

/**
 * explorer-Viewer
 */
export default function Component(props: Props): JSX.Element {
  const { data, loading = false, paths = [], listHeight: height } = props

  return (
    <Flex direction='column' gap='4' width='100%' className={c(props.className, NAME)}>
      <Flex gap='4' align='center' height='var(--space-7)' className={`${NAME}_header`}>
        <Button
          square={true}
          loading={loading}
          disabled={paths.length <= 1}
          variant='outline'
          onClick={() => {
            paths.pop()
            props.onPathChange([...paths])
          }}
        >
          <ChevronLeftIcon />
        </Button>

        {data && (
          <>
            <Flex gap='3' align='center'>
              {paths.map((path, i) => (
                <React.Fragment key={i}>
                  <Flex gap='2' align='center' asChild>
                    <Button
                      key={i}
                      variant={i === 0 ? 'soft' : 'ghost'}
                      size={i === 0 ? '3' : '2'}
                      onClick={() => {
                        if (paths.length - 1 === i) return
                        props.onPathChange(paths.slice(0, i - 1))
                      }}
                    >
                      <Type value={path.type} />
                      <div className={`${NAME}_name`}>{path.name}</div>
                    </Button>
                  </Flex>
                  {paths.length - 1 !== i && <ChevronRightIcon />}
                </React.Fragment>
              ))}
            </Flex>
          </>
        )}
      </Flex>
      <Flex direction='column' gap='1'>
        {data && (
          <ScrollArea>
            <div style={{ height }}>
              <Flex direction='column' gap='1' style={{ padding: '0 0 30px 0' }}>
                {data.items.map((item) => {
                  return (
                    <Item
                      key={item.name}
                      style={{ cursor: item.type !== 'record' ? 'pointer' : 'default' }}
                      onDoubleClick={
                        item.type === 'record'
                          ? undefined
                          : () => {
                              if (props.loading) return
                              props.onPathChange([...paths, { name: item.name, type: item.type }])
                            }
                      }
                      item={item}
                    />
                  )
                })}
              </Flex>
            </div>
          </ScrollArea>
        )}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
