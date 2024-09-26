import React, { useContext } from 'react'

import Button from '~/shared/button'
import Flex from '~/shared/flex'
import SharedIcon from '~/shared/icon'
import { c } from '~/utils/core'

import Icon from '../../../../icon'
import { context } from '../../../models/context'
import { NAME as ROOT_NAME } from '../../../ui/viewer'

export interface Props {
  className?: string | undefined
}

export const NAME = `${ROOT_NAME}-w-Breadscrums`

/**
 * explorer-Viewer-w-Breadscrums
 */
export default function Component(props: Props): JSX.Element {
  const { className } = props

  const { loading = false, paths = [], onPathChange } = useContext(context)

  return (
    <Flex className={c(className, NAME)} gap='4' align='center' height='var(--space-7)'>
      <Button
        square={true}
        loading={loading}
        disabled={paths.length <= 1}
        variant='outline'
        onClick={() => {
          paths.pop()
          onPathChange?.([...paths])
        }}
      >
        <SharedIcon name='ChevronLeft' />
      </Button>

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
                  onPathChange?.(paths.slice(0, i - 1))
                }}
              >
                <Icon name={path.type} />
                <div className={`${NAME}_name`}>{path.name}</div>
              </Button>
            </Flex>
            {paths.length - 1 !== i && <SharedIcon name='ChevronRight' />}
          </React.Fragment>
        ))}
      </Flex>
    </Flex>
  )
}

Component.displayName = NAME
